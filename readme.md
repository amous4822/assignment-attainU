npm install : to install all dependecies required to run the file

npm start : to start the services for API

API endpoints added to the file :

/api/jsonpatchrequest
    Apply the json patch to the json object, and return the resulting json object.

    usage : 

    {
        "original" : "JSON object",
        "patch" : "JSON patch" 
    }


POST /api/addUserAddress
    Creates a Request to add a user address  and save into the configured mssql database.

    usage :

    {
        "address" : "complete address"
    }


POST /api/thumbnail 
    Creates a Thumbnail using public image URL. Downloads the image and resizes it to 50x50 pixels, and return the resulting thumbnail.

    usage : 
    
    {
        "url": "public image address"
    }

POST /api/login
    For authentication

    usage:

    {
        "token": "JWT token"
    }