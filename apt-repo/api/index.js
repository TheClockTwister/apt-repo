const express = require('express');
const { exec } = require('child_process');
const multer = require('multer');
const basicAuth = require('basic-auth');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Set up Multer storage
const storage = multer.diskStorage({
    destination: process.env.DEB_DIR ?? __dirname,
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
// Create Multer upload instance
const upload = multer({ storage });

// Function to authenticate requests
function authenticate(req, res, next) {
    if (!process.env.API_USERNAME || !process.env.API_PASSWORD){
      return res.status(401).send('API disabled, no credentials specified!');
    }
    
    const credentials = basicAuth(req);

    function checkCredentials(username, password) { 
        return username === process.env.API_USERNAME && password === process.env.API_PASSWORD;
    }

    if (!credentials || !checkCredentials(credentials.name, credentials.pass)) {
        res.set('WWW-Authenticate', 'Basic realm="Authorization Required"');
        return res.status(401).send('Unauthorized');
    }

    next();
}

function listDirectoryFiles(directoryPath) {
    const files = fs.readdirSync(directoryPath);
  
    const fileData = files.map((file) => {
      const filePath = path.join(directoryPath, file);
      const stats = fs.statSync(filePath);
  
      return {
        name: file,
        size: stats.size,
      };
    });
  
    return fileData;
  }

// Endpoint for file upload
app.post('/api/upload-deb', authenticate, upload.single('file'), (req, res) => {
    if (!req.file) {
        // No file was uploaded
        return res.status(400).send('No file uploaded.');
      }
    res.send('File uploaded successfully!');
  });

app.get('/api/update-repo', authenticate, (req, res) => {
    exec("/usr/bin/update-repo", (error, stdout, stderr) => {
      if (error) {
        return res.status(500).send(error.message);
      }
      res.status(200).send(listDirectoryFiles(process.env.HTTP_DIR));
    });
  });

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
});
