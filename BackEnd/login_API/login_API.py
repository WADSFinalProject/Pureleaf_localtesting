from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
import requests
from login_pydantic import *
import mysql.connector
import firebase_admin
from mysql.connector import Error
from firebase_admin import credentials, auth, exceptions
import json

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

def create_mysql_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='*neoSQL01',
            database='central_database',
            auth_plugin='mysql_native_password'
        )
        if connection.is_connected():
            return connection
    except Error as e:
        print("Error while connecting to MySQL:", e)
    return None
    

# API Endpoints
# Register user endpoint
@app.post("/register")
def register_user(user: UserRegistration):
    connection = create_mysql_connection()
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
            return {"uid": user_record.uid, "email": user.email, "username": user.username, "user_type": user.user_type}
        
        except exceptions.FirebaseError as e:
            connection.rollback()
            raise HTTPException(status_code=400, detail=str(e))
        except Error as e:
            connection.rollback()
            print("Failed to insert record into MySQL table {}".format(e))
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()
    else:
        raise HTTPException(status_code=500, detail="Failed to connect to the database")


# Login user
@app.post("/login")
async def login(email: str = Body(...), password: str = Body(...)):
    url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDUFJFTNKv-LkGplr4-36MNOMXXj0wFL0Q"
    headers = {"Content-Type": "application/json"}
    data = json.dumps({"email": email, "password": password, "returnSecureToken": True})
    
    response = requests.post(url, headers=headers, data=data)

    if response.status_code == 200:
        user_info = response.json()
        uid = user_info['localId']

        connection = create_mysql_connection()
        if connection and connection.is_connected():
            cursor = connection.cursor()
            cursor.execute("SELECT user_type_id FROM user_account WHERE user_id = %s", (uid,))
            user_type = cursor.fetchone()[0]

            cursor.close()
            connection.close()

            return {"uid": uid, "email": user_info['email'], "user_type": user_type}
        else:
            raise HTTPException(status_code=500, detail="Failed to connect to the database")
    else:
        raise HTTPException(status_code=401, detail="Authentication failed")
    

# Get user information

# Get user information
@app.get("/user/{user_id}")
def get_user_info(user_id: str):
    connection = create_mysql_connection()
    if connection.is_connected():
        try:
            cursor = connection.cursor(dictionary=True)
            cursor.execute("SELECT user_id, username, email, user_type_id FROM user_account WHERE user_id = %s", (user_id,))
            user_info = cursor.fetchone()
            if user_info:
                return user_info
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
