# Titanic-Survival-Predictor
This project is about predicting wheather the traveller will survive or not from the titanic based on various properties like gender,age,etc.</br>
## Folder strucure of this repository is as follows
    .
    ├── backend
      ├── ml
        ├── model.py
        └── model_joblib
      ├── index.js
      ├── model_joblib
      ├── package-lock.json
      └── package.json
    ├── frontend
      ├── public
        └── index.html
      ├── src
        ├── components
          └── predict.js
        ├── helper
          └── fetchrequest.js
        ├── app.js
        ├── backend.js
        └── index.js
      ├── package-lock.json
      └── package.json
    ├── .gitignore
    └── README.md
## Setting up the project
1. Clone the repository
2. Open command prompt
3. Go to the folder location of this repository
4. Setup Frontend
    ```
    cd frontend
    npm install
    ```
5. Setup Backend
    - Go back to the project directory 
        ```
        cd..
        ```
    - Then run
        ```
        cd backend
        npm install
        cd ml
        pip install -r requirements.txt
        ```
    
## Running the predictor
1. Go to the frontend folder directory and run
    ```
    npm start
    ```
2. Go to the backend folder directory and run
    ```
    node index.js
    ```

