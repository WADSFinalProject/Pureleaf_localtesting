from typing import List
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from config import get_new_connection
from centra_pydantic import *

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# API Endpoints
# Get all orders
@app.get("/get_all_orders/{centra_id}", response_model=List[BatchInformation])
async def get_batches(centra_id: int):
    connection = get_new_connection()
    cursor = connection.cursor(dictionary=True)
    query = """
        SELECT bi.*, dl.*, wl.*, pl.* 
        FROM batch_information bi 
        LEFT JOIN dry_leaves dl ON bi.dry_leaves_ID = dl.dry_leaves_ID 
        LEFT JOIN wet_leaves wl ON bi.wet_leaves_ID = wl.wet_leaves_ID 
        LEFT JOIN powdered_leaves pl ON bi.powdered_leaves_ID = pl.powdered_leaves_ID 
        JOIN centra_user ON bi.centra_user_ID = centra_user.centra_user_ID 
        WHERE centra_user.centra_id = %s 
        ORDER BY batch_date DESC;
    """
    cursor.execute(query, (centra_id,))
    records = cursor.fetchall()
    batches = []
    for record in records:
        batch = BatchInformation(
            batch_ID=record['batch_ID'],
            batch_date=record['batch_date'],
            dry_leaves_ID=record['dry_leaves_ID'],
            wet_leaves_ID=record['wet_leaves_ID'],
            powdered_leaves_ID=record['powdered_leaves_ID'],
            status=record['status'],
            dry_leaves=DryLeaves(**record) if record['dry_leaves_ID'] else None,
            wet_leaves=WetLeaves(**record) if record['wet_leaves_ID'] else None,
            powdered_leaves=PowderedLeaves(**record) if record['powdered_leaves_ID'] else None
        )
        batches.append(batch)
    cursor.close()
    connection.close()
    return batches

# Get ongoing orders 
@app.get("/get_ongoing_orders/{centra_id}", response_model=List[BatchInformation])
async def get_ongoing_orders(centra_id: int):
    connection = get_new_connection()
    cursor = connection.cursor(dictionary=True)
    query = """
        SELECT bi.*, dl.*, wl.*, pl.*
            FROM batch_information bi
            LEFT JOIN dry_leaves dl ON bi.dry_leaves_ID = dl.dry_leaves_ID
            LEFT JOIN wet_leaves wl ON bi.wet_leaves_ID = wl.wet_leaves_ID
            LEFT JOIN powdered_leaves pl ON bi.powdered_leaves_ID = pl.powdered_leaves_ID
            JOIN centra_user ON bi.centra_user_ID = centra_user.centra_user_ID
            WHERE centra_user.centra_id = %s AND bi.status NOT IN (4, 5)
            ORDER BY bi.batch_date DESC
    """
    cursor.execute(query, (centra_id,))
    records = cursor.fetchall()
    batches = []
    for record in records:
        batch = BatchInformation(
            batch_ID=record['batch_ID'],
            batch_date=record['batch_date'],
            dry_leaves_ID=record['dry_leaves_ID'],
            wet_leaves_ID=record['wet_leaves_ID'],
            powdered_leaves_ID=record['powdered_leaves_ID'],
            status=record['status'],
            dry_leaves=DryLeaves(**record) if record['dry_leaves_ID'] else None,
            wet_leaves=WetLeaves(**record) if record['wet_leaves_ID'] else None,
            powdered_leaves=PowderedLeaves(**record) if record['powdered_leaves_ID'] else None
        )
        batches.append(batch)
    cursor.close()
    connection.close()
    return batches

@app.get("/get_order/{batch_id}", response_model=BatchInformation)
async def get_ongoing_orders(batch_id: int):
    connection = get_new_connection()
    cursor = connection.cursor(dictionary=True)
    query = """
        SELECT bi.*, dl.*, wl.*, pl.*
            FROM batch_information bi
            LEFT JOIN dry_leaves dl ON bi.dry_leaves_ID = dl.dry_leaves_ID
            LEFT JOIN wet_leaves wl ON bi.wet_leaves_ID = wl.wet_leaves_ID
            LEFT JOIN powdered_leaves pl ON bi.powdered_leaves_ID = pl.powdered_leaves_ID
            JOIN centra_user ON bi.centra_user_ID = centra_user.centra_user_ID
            WHERE bi.batch_id = %s;
    """
    cursor.execute(query, (batch_id,))
    records = cursor.fetchall()
    record = records[0]
    batch = BatchInformation(
        batch_ID=record['batch_ID'],
        batch_date=record['batch_date'],
        dry_leaves_ID=record['dry_leaves_ID'],
        wet_leaves_ID=record['wet_leaves_ID'],
        powdered_leaves_ID=record['powdered_leaves_ID'],
        status=record['status'],
        dry_leaves=DryLeaves(**record) if record['dry_leaves_ID'] else None,
        wet_leaves=WetLeaves(**record) if record['wet_leaves_ID'] else None,
        powdered_leaves=PowderedLeaves(**record) if record['powdered_leaves_ID'] else None
    )
    cursor.close()
    connection.close()
    return batch

# Set Batch Information
@app.post("/set_batch_information", response_model=BatchInformation, status_code=201)
async def set_batch_information(batch_info: BatchInformation):
    connection = get_new_connection()
    cursor = connection.cursor()
    query = """
        INSERT INTO batch_information (batch_date, dry_leaves_ID, wet_leaves_ID, powdered_leaves_ID, status)
        VALUES (%s, %s, %s, %s, %s);
    """
    values = (
        batch_info.batch_date,
        batch_info.dry_leaves_ID,
        batch_info.wet_leaves_ID,
        batch_info.powdered_leaves_ID,
        batch_info.status
    )
    try:
        cursor.execute(query, values)
        connection.commit()
    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        cursor.close()
        connection.close()
    return batch_info

# Set Wet Leaves Information
@app.post("/set_wet_leaves_information", response_model=WetLeaves, status_code=201)
async def set_dry_leaves_information(wet_leaves: WetLeaves):
    connection = get_new_connection()
    cursor = connection.cursor()
    query = """
        INSERT INTO wet_leaves (wet_weight, wet_date, wet_image)
        VALUES (%s, %s, %s);
    """
    values = (
        wet_leaves.wet_weight,
        wet_leaves.wet_date,
        wet_leaves.wet_image
    )
    try:
        cursor.execute(query, values)
        connection.commit()
        wet_leaves.wet_leaves_ID = cursor.lastrowid  
    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        cursor.close()
        connection.close()
    return wet_leaves

# Set Dry Leaves Information
@app.post("/set_dry_leaves_information", response_model=DryLeaves, status_code=201)
async def set_dry_leaves_information(dry_leaves: DryLeaves):
    connection = get_new_connection()
    cursor = connection.cursor()
    query = """
        INSERT INTO dry_leaves (dry_weight, dry_date, dry_image)
        VALUES (%s, %s, %s);
    """
    values = (
        dry_leaves.dry_weight,
        dry_leaves.dry_date,
        dry_leaves.dry_image
    )
    try:
        cursor.execute(query, values)
        connection.commit()
        dry_leaves.dry_leaves_ID = cursor.lastrowid  
    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        cursor.close()
        connection.close()
    return dry_leaves

# Set Powdered Leaves Information
@app.post("/set_powdered_leaves_information", response_model=PowderedLeaves, status_code=201)
async def set_dry_leaves_information(powdered_leaves: PowderedLeaves):
    connection = get_new_connection()
    cursor = connection.cursor()
    query = """
        INSERT INTO powdered_leaves (powdered_weight, powdered_date, powdered_image)
        VALUES (%s, %s, %s);
    """
    values = (
        powdered_leaves.powdered_weight,
        powdered_leaves.powdered_date,
        powdered_leaves.powdered_image
    )
    try:
        cursor.execute(query, values)
        connection.commit()
        powdered_leaves.powdered_leaves_ID = cursor.lastrowid  
    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        cursor.close()
        connection.close()
    return powdered_leaves


# Update Order Status 
@app.put("/update_order_status/{batch_ID}", status_code=200)
async def update_order_status(batch_ID: int, status_update: OrderStatusUpdate):
    connection = get_new_connection()
    cursor = connection.cursor()
    query = """
        UPDATE batch_information
        SET status = %s
        WHERE batch_ID = %s;
    """
    try:
        cursor.execute(query, (status_update.status, batch_ID))
        connection.commit()
    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=400, detail=str(e))

    # Check if the update was successful (i.e., affected rows > 0)
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Batch not found or status unchanged")

    cursor.close()
    connection.close()
    return JSONResponse(content={"message": "Batch has been updated successfully"})


@app.put("/update_wet_leaves_data/{batch_ID}", status_code=200)
async def update_order_status(batch_ID: int, wet_id: int):
    connection = get_new_connection()
    cursor = connection.cursor()
    query = """
        UPDATE batch_information
        SET wet_leaves_ID = %s
        WHERE batch_ID = %s;
    """
    try:
        cursor.execute(query, (wet_id, batch_ID))
        connection.commit()
    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=400, detail=str(e))

    # Check if the update was successful (i.e., affected rows > 0)
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Batch not found or status unchanged")

    cursor.close()
    connection.close()
    return JSONResponse(content={"message": "Batch has been updated successfully"})


@app.put("/update_dry_leaves_data/{batch_ID}", status_code=200)
async def update_order_status(batch_ID: int, dry_id: int):
    connection = get_new_connection()
    cursor = connection.cursor()
    query = """
        UPDATE batch_information
        SET dry_leaves_ID = %s
        WHERE batch_ID = %s;
    """
    try:
        cursor.execute(query, (dry_id, batch_ID))
        connection.commit()
    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=400, detail=str(e))

    # Check if the update was successful (i.e., affected rows > 0)
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Batch not found or status unchanged")

    cursor.close()
    connection.close()
    return JSONResponse(content={"message": "Batch has been updated successfully"})


@app.put("/update_powdered_leaves_data/{batch_ID}", status_code=200)
async def update_order_status(batch_ID: int, powder_id: int):
    connection = get_new_connection()
    cursor = connection.cursor()
    query = """
        UPDATE batch_information
        SET powdered_leaves_ID = %s
        WHERE batch_ID = %s;
    """
    try:
        cursor.execute(query, (powder_id, batch_ID))
        connection.commit()
    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=400, detail=str(e))

    # Check if the update was successful (i.e., affected rows > 0)
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Batch not found or status unchanged")

    cursor.close()
    connection.close()
    return JSONResponse(content={"message": "Batch has been updated successfully"})


# Update Wet Leaves Weight
@app.put("/update_wet_leaves_weight/{wet_leaves_ID}", status_code=200)
async def update_wet_leaves_weight(wet_leaves_ID: int, weight_update: WetLeavesWeightUpdate):
    connection = get_new_connection()
    cursor = connection.cursor()
    query = """
        UPDATE wet_leaves
        SET wet_weight = %s
        WHERE wet_leaves_ID = %s;
    """
    try:
        cursor.execute(query, (weight_update.wet_weight, wet_leaves_ID))
        connection.commit()
    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=400, detail=str(e))

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Wet leaves record not found or weight unchanged")

    cursor.close()
    connection.close()
    return JSONResponse(content={"message": "Wet leaves weight has been updated successfully"})

# Update Dry Leaves Weight
@app.put("/update_dry_leaves_weight/{dry_leaves_ID}", status_code=200)
async def update_dry_leaves_weight(dry_leaves_ID: int, weight_update: DryLeavesWeightUpdate):
    connection = get_new_connection()
    cursor = connection.cursor()
    query = """
        UPDATE dry_leaves
        SET dry_weight = %s
        WHERE dry_leaves_ID = %s;
    """
    try:
        cursor.execute(query, (weight_update.dry_weight, dry_leaves_ID))
        connection.commit()
    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=400, detail=str(e))

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Dry leaves record not found or weight unchanged")

    cursor.close()
    connection.close()
    return JSONResponse(content={"message": "Dry leaves weight has been updated successfully"})

# Update Powedered Leaves Weight
@app.put("/update_powdered_leaves_weight/{powdered_leaves_ID}", status_code=200)
async def update_powdered_leaves_weight(powdered_leaves_ID: int, weight_update: PowderedLeavesWeightUpdate):
    connection = get_new_connection()
    cursor = connection.cursor()
    query = """
        UPDATE powdered_leaves
        SET powdered_weight = %s
        WHERE powdered_leaves_ID = %s;
    """
    try:
        cursor.execute(query, (weight_update.powdered_weight, powdered_leaves_ID))
        connection.commit()
    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=400, detail=str(e))

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Powdered leaves record not found or weight unchanged")

    cursor.close()
    connection.close()
    return JSONResponse(content={"message": "Powdered leaves weight has been updated successfully"})


# Create a new shipment, takes in harbor ID as parameter
@app.post("/create_harbor_checkpoint", response_model=HarborCheckpointCreate, status_code=status.HTTP_201_CREATED)
async def create_harbor_checkpoint(checkpoint_data: HarborCheckpointCreate):
    connection = get_new_connection()
    cursor = connection.cursor(dictionary=True)
    # Default values: transport_status set to 1, other optional fields are set to NULL if not provided
    query = """
        INSERT INTO harbor_checkpoint (sent_date, batch_ID, harbor_ID, transport_status, harbor_batch_rescale, arrival_date, hg_user_ID)
        VALUES (%s, %s, %s, 1, NULL, NULL, NULL);
    """
    values = (
        checkpoint_data.sent_date,
        checkpoint_data.batch_ID,
        checkpoint_data.harbor_ID
    )
    try:
        cursor.execute(query, values)
        connection.commit()
        new_checkpoint_id = cursor.lastrowid
    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        cursor.close()

    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM harbor_checkpoint WHERE checkpoint_ID = %s", (new_checkpoint_id,))
    new_checkpoint = cursor.fetchone()
    cursor.close()
    connection.close()
    return new_checkpoint
