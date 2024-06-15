import mysql.connector
from mysql.connector import Error

def create_server_connection(host_name, user_name, user_password, db_name):
    connection = None
    try:
        connection = mysql.connector.connect(
            host=host_name,
            user=user_name,
            passwd=user_password,
            database=db_name
        )
        if connection.is_connected():
            print("MySQL Database connection successful")
            # Test the connection with a simple query
            cursor = connection.cursor()
            cursor.execute("SELECT VERSION()")
            db_version = cursor.fetchone()
            print("Database version:", db_version)
            cursor.close()
    except Error as err:
        print(f"Error: '{err}'")

    return connection

connection = create_server_connection("127.0.0.1", "root", "*neoSQL01", "todolist")
