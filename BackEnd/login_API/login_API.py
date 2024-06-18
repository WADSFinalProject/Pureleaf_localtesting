from fastapi import FastAPI, HTTPException, Body, Response, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import requests
from login_pydantic import *
import firebase_admin
from firebase_admin import credentials, auth, exceptions
import json
from config import get_new_connection

cred = credentials.Certificate('pureleaf-9d01f-firebase-adminsdk-fyu2u-356ec2f32c.json')
firebase_admin.initialize_app(cred)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
    
# API Endpoints
# Register user endpoint
@app.post("/register")
def register_user(user: UserRegistration):
    connection = get_new_connection()
    if connection.is_connected():
        try:
            # Create user in Firebase
            user_record = auth.create_user(
                email=user.email,
                password=user.password
            )
            
            # Insert the user into SQL Database
            user_account_query = "INSERT INTO user_account (user_id, email, username, user_type_id) VALUES (%s, %s, %s, %s)"
            user_account_data = (user_record.uid, user.email, user.username, user.user_type)
            cursor = connection.cursor()
            cursor.execute(user_account_query, user_account_data)
            connection.commit()
            
            # Insert the user into the respective type-specific table
            if user.user_type == 1:  # Admin
                admin_query = "INSERT INTO admin_user (user_id) VALUES (%s)"
                cursor.execute(admin_query, (user_record.uid,))
            elif user.user_type == 2:  # Centra
                centra_query = "INSERT INTO centra_user (user_id) VALUES (%s)"
                cursor.execute(centra_query, (user_record.uid,))
            elif user.user_type == 3:  # Harbor
                harbor_query = "INSERT INTO harbor_guard_user (user_id) VALUES (%s)"
                cursor.execute(harbor_query, (user_record.uid,))
            
            connection.commit()
            return {"uid": user_record.uid, "email": user.email, "username": user.username, "user_type_ID": user.user_type}
        
        except exceptions.FirebaseError as e:
            connection.rollback()
            raise HTTPException(status_code=400, detail=str(e))
        except mysql.connector.Error as e:
            connection.rollback()
            print("Failed to insert record into MySQL table {}".format(e))
            raise HTTPException(status_code=500, detail="Failed to insert record into MySQL table")
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()
    else:
        raise HTTPException(status_code=500, detail="Failed to connect to the database")


@app.post("/login")
async def login(email: str = Body(...), password: str = Body(...)):
    url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDUFJFTNKv-LkGplr4-36MNOMXXj0wFL0Q"
    headers = {"Content-Type": "application/json"}
    data = json.dumps({"email": email, "password": password, "returnSecureToken": True})
    
    response = requests.post(url, headers=headers, data=data)

    if response.status_code == 200:
        user_info = response.json()
        uid = user_info['localId']

        connection = get_new_connection()
        if connection and connection.is_connected():
            try:
                cursor = connection.cursor()
                cursor.execute("SELECT user_type_id FROM user_account WHERE user_id = %s", (uid,))
                user_type = cursor.fetchone()[0]

                result = {
                    "uid": uid,
                    "email": user_info['email'],
                    "user_type": user_type
                }
                
                if user_type == 2:  
                    cursor.execute("SELECT centra_ID FROM centra_user WHERE user_id = %s", (uid,))
                    centra_id = cursor.fetchone()[0]
                    result['centra_ID'] = centra_id

                    cursor.execute("SELECT centra_name, centra_address FROM centra_detail WHERE centra_ID = %s", (centra_id,))
                    centra_detail = cursor.fetchone()
                    result['centra_name'] = centra_detail[0]
                    result['centra_address'] = centra_detail[1]

                if user_type == 3:  
                    cursor.execute("SELECT harbor_ID FROM harbor_guard_user WHERE user_id = %s", (uid,))
                    harbor_id = cursor.fetchone()[0]
                    result['harbor_ID'] = harbor_id

                    cursor.execute("SELECT harbor_name, harbor_address FROM harbor_detail WHERE harbor_ID = %s", (harbor_id,))
                    harbor_detail = cursor.fetchone()
                    result['harbor_name'] = harbor_detail[0]
                    result['harbor_address'] = harbor_detail[1]

                cursor.close()
                connection.close()

                return result
            except Error as e:
                connection.rollback()
                print(f"Failed to execute query: {e}")
                raise HTTPException(status_code=500, detail="Internal server error")
        else:
            raise HTTPException(status_code=500, detail="Failed to connect to the database")
    else:
        raise HTTPException(status_code=401, detail="Authentication failed")
    
# Get user information
@app.get("/user/{user_id}")
async def get_user_info(user_id: str, request: Request, response: Response):
    connection = get_new_connection()
    if connection.is_connected():
        try:
            cursor = connection.cursor(dictionary=True)
            cursor.execute("SELECT user_id, username, email, user_type_id FROM user_account WHERE user_id = %s", (user_id,))
            user_info = cursor.fetchone()
            if user_info:
                user_type_id = user_info['user_type_id']
                session_data = {}
                if user_type_id == 2:
                    # Fetch centra information
                    cursor.execute("SELECT centra_ID, user_id AS centra_user_ID FROM centra_user WHERE user_id = %s", (user_id,))
                    centra_user_info = cursor.fetchone()
                    if centra_user_info:
                        cursor.execute("SELECT centra_name, centra_address FROM centra_detail WHERE centra_ID = %s", (centra_user_info['centra_ID'],))
                        centra_detail = cursor.fetchone()
                        if centra_detail:
                            user_info.update(centra_detail)
                            user_info.update(centra_user_info)  # Add centra_user_ID and centra_ID
                            session_data['centra_user_ID'] = centra_user_info['centra_user_ID']
                        else:
                            raise HTTPException(status_code=404, detail="Centra details not found")
                elif user_type_id == 3:
                    # Fetch harbor information
                    cursor.execute("SELECT harbor_ID, hg_user_ID FROM harbor_guard_user WHERE user_id = %s", (user_id,))
                    harbor_user_info = cursor.fetchone()
                    if harbor_user_info:
                        cursor.execute("SELECT harbor_name, harbor_address FROM harbor_detail WHERE harbor_ID = %s", (harbor_user_info['harbor_ID'],))
                        harbor_detail = cursor.fetchone()
                        if harbor_detail:
                            user_info.update(harbor_detail)
                            user_info.update(harbor_user_info)  # Add hg_user_ID and harbor_ID
                            session_data['hg_user_ID'] = harbor_user_info['hg_user_ID']
                        else:
                            raise HTTPException(status_code=404, detail="Harbor details not found")
                
                # Add session data to response headers
                for key, value in session_data.items():
                    response.set_cookie(key=key, value=value)
                
                return JSONResponse(content=user_info)
            else:
                raise HTTPException(status_code=404, detail="User not found")
        except Error as e:
            raise HTTPException(status_code=500, detail=f"Database query failed: {e}")
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()
    else:
        raise HTTPException(status_code=500, detail="Failed to connect to the database")
