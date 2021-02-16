const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const jsonpatch = require('jsonpatch');
const resizer = require('node-image-resizer');
const { response } = require('express');
const download = require('image-downloader')

var Db  = require('./dboperations');
const dboperations = require('./dboperations');



const app = express();
app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

app.patch('/api/jsonpatchrequest', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'key', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
        //console.log(req.body)
        let response="not valid request (should contain property original and patch)";
        if(req.body.hasOwnProperty('original') && req.body.hasOwnProperty('patch')){
            response= jsonpatch.apply_patch(req.body.original, req.body.patch);
        } 
        
        res.json({
            result : response
        });
    }
  });
});


app.post('/api/addUserAddress', verifyToken, (req, res) => {  
    jwt.verify(req.token, 'key', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
          //console.log(req.body)
          let response="not valid request (should contain property address)";
          if(req.body.hasOwnProperty('address')){
              /** 
              
              dboperations.addData(req.body.address).then(result => {
                response.status(201).json(result);
             })
             execute after configuring dbconfig.js
             */

             response = req.body.address
          } 
          
          res.json({
              result : response
          });
      }
    });
  });



app.post('/api/thumbnail', verifyToken, (req, res) => {  
    jwt.verify(req.token, 'key', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
          //console.log(req.body)
          let response="not valid request (should contain url property)";
            if(req.body.hasOwnProperty('url')){
                response = "inside";


                const options = {
                    url: req.body.url,
                    dest: './thumbnails'                // will be saved to thumbnails folder
                }

                const setup = {
                    all: {
                        path: './edit'
                    },
                    versions: {
                        prefix:'don_',
                        width: 5,
                        height: 5
                    }
                }
  
                download.image(options)
                .then(({ filename }) => {
                    console.log("saved in", filename)
                })
                .catch((err) => console.error(err))    

                // (async () => {
                //     await resizer('./thumbnails/1200px-Image_created_with_a_mobile_phone.png', setup)
                //     console.log('Saved to');
                // })();
        } 
          
          res.json({
              result : response
          });
      }
    });
  });
  


app.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    username: 'albin',
    password: 'password'
  }

  jwt.sign({user}, 'key', (err, token) => {
    res.json({
      token
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    res.sendStatus(403); // Forbidden
  }

}

app.listen(5000, () => console.log('Server started on port 5000'));
