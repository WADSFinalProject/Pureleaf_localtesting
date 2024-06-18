from typing import List, Optional
from fastapi import FastAPI, UploadFile, File, HTTPException, Body
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from harbor_pydantic import *
from config import get_new_connection
import mysql.connector
from mysql.connector import Error

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

#API Endpoints
# Get all shipment
@app.get("/shipments", response_model=List[HarborCheckpoint])
def get_all_shipments():
    conn = get_new_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT hc.*, bs.status_description AS transport_status_description FROM harbor_checkpoint hc JOIN batch_status bs ON hc.transport_status = bs.status_ID")
        result = cursor.fetchall()
        if not result:
            raise HTTPException(status_code=404, detail="No shipments found")
        
        # Log and validate the fetched data
        print("Fetched Data:", result)
        for row in result:
            if 'transport_status_description' not in row:
                raise HTTPException(status_code=500, detail="Missing required data: transport_status_description")

        return [HarborCheckpoint(**row) for row in result]
    except Error as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail=f"Database query failed: {e}")
    finally:
        cursor.close()
        conn.close()


# Get shipment based on sent_date
@app.get("/shipments/sent_date/{date}", response_model=List[HarborCheckpoint])
def get_shipment_by_sent_date(date: datetime):
    conn = get_new_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM harbor_checkpoint WHERE sent_date = %s", (date,))
        result = cursor.fetchall()
        if not result:
            raise HTTPException(status_code=404, detail="Shipment not found")
        return [HarborCheckpoint(**row) for row in result]
    except Error as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail=f"Database query failed: {e}")
    finally:
        cursor.close()
        conn.close()


# Get shipment based on arrival_date
@app.get("/shipments/arrival_date/{date}", response_model=List[HarborCheckpoint])
def get_shipment_by_arrival_date(date: datetime):
    conn = get_new_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM harbor_checkpoint WHERE arrival_date = %s", (date,))
        result = cursor.fetchall()
        if not result:
            raise HTTPException(status_code=404, detail="Shipment not found")
        return [HarborCheckpoint(**row) for row in result]
    except Error as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail=f"Database query failed: {e}")
    finally:
        cursor.close()
        conn.close()


# Get shipment based on harbor_ID
@app.get("/shipment/{harbor_ID}", response_model=List[HarborCheckpoint])
def get_shipment_by_harbor(harbor_ID: int):
    conn = get_new_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    cursor = conn.cursor(dictionary=True)  
    try:
        cursor.execute("SELECT * FROM harbor_checkpoint WHERE harbor_ID = %s", (harbor_ID,))
        result = cursor.fetchall()
        if not result:
            raise HTTPException(status_code=404, detail="Shipment not found")
        return [HarborCheckpoint(**row) for row in result]
    except Error as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail=f"Database query failed: {e}")
    finally:
        cursor.close()
        conn.close()


# Get shipment based on specific harbor_ID and its sent_date 
@app.get("/shipments/{harbor_id}/sent_date/{date}", response_model=List[HarborCheckpoint])
def get_shipment_by_harbor_and_sent_date(harbor_id: int, date: datetime):
    conn = get_new_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM harbor_checkpoint WHERE harbor_ID = %s AND sent_date = %s", (harbor_id, date))
        result = cursor.fetchall()
        if not result:
            raise HTTPException(status_code=404, detail="No shipments found for the specified date and harbor")
        return [HarborCheckpoint(**row) for row in result]
    except Error as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail=f"Database query failed: {e}")
    finally:
        cursor.close()
        conn.close()


# Get shipment based on specific harbor_ID and its arrival_date 
@app.get("/shipments/{harbor_id}/arrival_date/{date}", response_model=List[HarborCheckpoint])
def get_shipment_by_harbor_and_arrival_date(harbor_id: int, date: datetime):
    conn = get_new_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM harbor_checkpoint WHERE harbor_ID = %s AND arrival_date = %s", (harbor_id, date))
        result = cursor.fetchall()
        if not result:
            raise HTTPException(status_code=404, detail="No shipments found for the specified date and harbor")
        return [HarborCheckpoint(**row) for row in result]
    except Error as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail=f"Database query failed: {e}")
    finally:
        cursor.close()
        conn.close()


# Updating the status of shipment
@app.put("/updateShipment/{harbor_id}/{shipment_id}/{status}")
def update_shipment_status(harbor_id: int, shipment_id: int, status: int):
    conn = get_new_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    cursor = conn.cursor()
    try:
        # Update the harbor_checkpoint table
        cursor.execute("UPDATE harbor_checkpoint SET transport_status = %s WHERE harbor_ID = %s AND checkpoint_ID = %s", (status, harbor_id, shipment_id))
        conn.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Shipment not found or status unchanged")
        
        # Assuming you can retrieve the batch_ID from the shipment_id
        cursor.execute("SELECT batch_ID FROM harbor_checkpoint WHERE harbor_ID = %s AND checkpoint_ID = %s", (harbor_id, shipment_id))
        result = cursor.fetchone()
        if not result:
            raise HTTPException(status_code=404, detail="Batch ID not found for the given shipment")
        
        batch_id = result[0]
        
        # Update the central_database.batch_information table
        cursor.execute("UPDATE central_database.batch_information SET status = %s WHERE batch_ID = %s", (status, batch_id))
        conn.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Batch information not found or status unchanged")
        
        return {"message": "Shipment and batch status updated successfully"}
    except Error as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail=f"Database update failed: {e}")
    finally:
        cursor.close()
        conn.close()


# Latest shipment
@app.get("/shipments/{harbor_ID}/latest", response_model=HarborCheckpoint)
def get_latest_shipment(harbor_ID: int):
    conn = get_new_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("""
            SELECT hc.*, bs.status_description AS transport_status_description
            FROM harbor_checkpoint hc
            JOIN batch_status bs ON hc.transport_status = bs.status_ID
            WHERE hc.harbor_ID = %s
            ORDER BY hc.sent_date DESC LIMIT 1
        """, (harbor_ID,))
        result = cursor.fetchone()
        if not result:
            raise HTTPException(status_code=404, detail="No shipments found for this harbor")
        return HarborCheckpoint(**result)
    except Error as e:
        raise HTTPException(status_code=500, detail=f"Database query failed: {e}")
    finally:
        cursor.close()
        conn.close()


# Finished shipments
@app.get("/shipments/{harbor_ID}/finished", response_model=List[HarborCheckpoint])
def get_shipments_with_status_3(harbor_ID: int):
    conn = get_new_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("""
            SELECT hc.*, bs.status_description AS transport_status_description
            FROM harbor_checkpoint hc
            JOIN batch_status bs ON hc.transport_status = bs.status_ID
            WHERE hc.transport_status = 3 AND hc.harbor_ID = %s
        """, (harbor_ID,))
        result = cursor.fetchall()
        if not result:
            raise HTTPException(status_code=404, detail="No finished shipments found for this harbor")
        return [HarborCheckpoint(**row) for row in result]
    except Error as e:
        raise HTTPException(status_code=500, detail=f"Database query failed: {e}")
    finally:
        cursor.close()
        conn.close()


# Update Shipment Information
@app.put("/update_harbor_shipment/{harbor_ID}/{checkpoint_ID}")
def update_harbor_shipment(harbor_ID: int, checkpoint_ID: int, update_data: UpdateShipment = Body(...)):
    conn = get_new_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    cursor = conn.cursor()
    try:
        cursor.execute("""
            UPDATE harbor_checkpoint
            SET harbor_batch_rescale = %s,
                transport_status = %s,
                hg_user_ID = %s,
                arrival_date = %s
            WHERE harbor_ID = %s AND checkpoint_ID = %s
        """, (
            update_data.harbor_batch_rescale, 
            update_data.transport_status, 
            update_data.hg_user_ID, 
            update_data.arrival_date if update_data.arrival_date else datetime.now(),
            harbor_ID, 
            checkpoint_ID
        ))
        conn.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Shipment not found or no changes made")
        return {"message": "Shipment updated successfully"}
    except Error as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail=f"Database query failed: {e}")
    finally:
        cursor.close()
        conn.close()

# Get shipment based on harbor_ID and checkpoint_ID
@app.get("/shipment/{harbor_ID}/{checkpoint_ID}", response_model=HarborCheckpointInformation)
def get_shipment_by_harbor_and_checkpoint(harbor_ID: int, checkpoint_ID: int):
    conn = get_new_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    cursor = conn.cursor(dictionary=True)
    try:
        query = """
        SELECT hc.*, bi.batch_date, bi.dry_leaves_ID, bi.wet_leaves_ID, bi.powdered_leaves_ID, bi.status AS batch_status
        FROM harbor_checkpoint hc
        JOIN batch_information bi ON hc.batch_ID = bi.batch_ID
        WHERE hc.harbor_ID = %s AND hc.checkpoint_ID = %s
        """
        cursor.execute(query, (harbor_ID, checkpoint_ID))
        result = cursor.fetchone()
        if not result:
            raise HTTPException(status_code=404, detail="Shipment not found")

        # Set default values if they are None
        harbor_batch_rescale = result["harbor_batch_rescale"] if result["harbor_batch_rescale"] is not None else 0.0
        arrival_date = result["arrival_date"] if result["arrival_date"] is not None else datetime.now()
        hg_user_ID = result["hg_user_ID"] if result["hg_user_ID"] is not None else 0 # or set to the session user ID

        shipment_info = HarborCheckpointInformation(
            checkpoint_ID=result["checkpoint_ID"],
            harbor_batch_rescale=harbor_batch_rescale,
            sent_date=result["sent_date"],
            arrival_date=arrival_date,
            transport_status=result["transport_status"],
            batch_ID=result["batch_ID"],
            batch_date=result["batch_date"],
            dry_leaves_ID=result.get("dry_leaves_ID"),
            wet_leaves_ID=result.get("wet_leaves_ID"),
            powdered_leaves_ID=result.get("powdered_leaves_ID"),
            status=result["batch_status"],
            dry_leaves=None, 
            wet_leaves=None, 
            powdered_leaves=None, 
            hg_user_ID=hg_user_ID
        )
        return shipment_info
    except Error as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail=f"Database query failed: {e}")
    finally:
        cursor.close()
        conn.close()

# Get shipment based on harbor_ID sorted by the most recent arrival (sent to harbor)
@app.get("/recentshipment/{harbor_ID}", response_model=List[HarborCheckpoint])
def get_shipment_by_harbor(harbor_ID: int):
    conn = get_new_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    cursor = conn.cursor(dictionary=True)
    try:
        query = """
        SELECT hc.*, bs.status_description AS transport_status_description
        FROM harbor_checkpoint hc
        JOIN batch_status bs ON hc.transport_status = bs.status_ID
        WHERE hc.harbor_ID = %s
        ORDER BY hc.sent_date DESC
        """
        cursor.execute(query, (harbor_ID,))
        result = cursor.fetchall()
        if not result:
            raise HTTPException(status_code=404, detail="Shipment not found")
        return [HarborCheckpoint(**row) for row in result]
    except Error as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail=f"Database query failed: {e}")
    finally:
        cursor.close()
        conn.close()

# Get shipment based on harbor_ID sorted by the most recently finished (arrival to admin)
@app.get("/finishedshipments/{harbor_ID}", response_model=List[HarborCheckpoint])
def get_finished_shipments_by_harbor(harbor_ID: int):
    conn = get_new_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    cursor = conn.cursor(dictionary=True)
    try:
        query = """
        SELECT hc.*, bs.status_description AS transport_status_description
        FROM harbor_checkpoint hc
        JOIN batch_status bs ON hc.transport_status = bs.status_ID
        WHERE hc.harbor_ID = %s
        ORDER BY hc.arrival_date DESC
        """
        cursor.execute(query, (harbor_ID,))
        result = cursor.fetchall()
        if not result:
            raise HTTPException(status_code=404, detail="Shipment not found")
        return [HarborCheckpoint(**row) for row in result]
    except Error as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail=f"Database query failed: {e}")
    finally:
        cursor.close()
        conn.close()