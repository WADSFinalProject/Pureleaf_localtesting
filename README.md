# Pureleaf_localtesting
Contains all the files of Pureleaf for local testing.

# Setup
## Database
1. Install MySQL Workbench and set up the root user with the root user.
2. Open ```config.py``` in the BackEnd folder and enter the password set up in MySQL Workbench.
3. Open MySQL Workbench and load the SQL dump in Navigator > Administration > Data Import/Restore, and import central_database

## API
1. Copy the edited ```config.py``` file into each of the folders (admin_api, centra_api, harbor_api, login_api)
2. Resolve the dependencies by using pip install to install the libraries (pydantic, mysql-connector, fastapi, firebase_admin, etc)
3. Run the apis using uvicorn with these ports:
     1. ```uvicorn login_API:app --reload --port 8000```
     2. ```uvicorn admin_API:app --reload --port 8001```
     3. ```uvicorn centra_API:app --reload --port 8002```
     4. ```uvicorn harbor_API:app --reload --port 8003```

      Make sure to run the commands in the respective directories

## Frontend
1. Open command line in the frontend folder
2. run ```npm install```
3. After the package installation is finished, run ```npm run dev -- -p 5173``` 

# Credentials
- Centra
  - Email => centra@gmail.com
  - Password => centrapass
- Harbor
  - Email => harbor@gmail.com
  - Password => harborpass
- Admin
  - Email => admin@gmail.com
  - Password => adminpass
