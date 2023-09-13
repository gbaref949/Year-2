/*
Students are to create a function or program that does the following USING JS COMMANDS ONLY
Reads and displays all files in a chosen folder
Re-names all files in the folder using a string template with an increasing number representing the file's order in the sequence

Extra Credit(10)
Create an HTML user interface using node Allowing for more customizations and individual file selection for renaming. You may need libraries like no-cors 
bbb
Make sure that the user interface for HTML can point to a folder and navigate to find the correct folder
Make sure the JS has a string template for renaming
RETURN THE JS FILE WITH THE CODE
*/

//declared and imported the necessary Node.js modules
const fs = require('fs'); //declared a file System module for reading and renaming files
const path = require('path'); //declared a path module for working with file paths
const http = require('http'); //declared a HTTP module for creating a server
const express = require('express'); //declared a xpress.js framework for serving web pages
const bodyParser = require('body-parser'); //declared a middleware for parsing form data

const app = express(); //declared an express app
const port = 5000; //specified the port to listen on

//created a res for the app to send the request to the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); //send the html file to the client
});

app.use(bodyParser.urlencoded({ extended: true })); //used bodyParser to parse form data

//this will handle the file upload and renaming when the user submits the form data to "/upload"
app.post('/upload', (req, res) => {
  const directoryPath = req.body.folderPath; //got the folder path from the submitted form data
  const template = req.body.template; //got the renaming template from the submitted form data

  //readdir will read the contents of the specified directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.send('Unable to scan directory: ' + err); //then it will handle errors when reading the directory
    }

    //used a foreach loop to go through each file in the directory
    files.forEach((file, index) => {
      const fileExt = path.extname(file); //go the file's extension (e.g., ".txt", ".jpg")
      const newName = template.replace('{{index}}', index + 1) + fileExt; //created the new file name based on the template
      const oldPath = path.join(directoryPath, file); //got the old file's path
      const newPath = path.join(directoryPath, newName); //got the new file's path

      //renamed the file using the new path and name
      fs.renameSync(oldPath, newPath);
    });

    res.send('Files renamed successfully!'); //used a res to send a success message back to the client
  });
});

//lastly I created an HTTP server to listen on the specified port
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});