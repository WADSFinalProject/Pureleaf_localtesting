import mysql.connector
from mysql.connector import Error

def get_new_connection():
    try:
        connection = mysql.connector.connect(
            host="127.0.0.1",
            user="root",
            passwd="Insert Password Here",
            database="central_database",
            auth_plugin='mysql_native_password'
        )
        print("MySQL Database connection successful")
        return connection
    except Error as err:
        print(f"Error: '{err}'")
        return None