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
// Import necessary Node.js modules
const fs = require('fs'); // File System module for reading and renaming files
const path = require('path'); // Path module for working with file paths
const http = require('http'); // HTTP module for creating a server
const express = require('express'); // Express.js framework for serving web pages
const bodyParser = require('body-parser'); // Middleware for parsing form data

const app = express(); // Create an Express application
const port = 3000; // Specify the port for the server to listen on

// Serve HTML with a file input and customization options when the user accesses the root URL ("/")
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Send the HTML file to the client
});

app.use(bodyParser.urlencoded({ extended: true })); // Use bodyParser to parse form data

// Handle file upload and renaming when the user submits the form data to "/upload"
app.post('/upload', (req, res) => {
  const directoryPath = req.body.folderPath; // Get the folder path from the submitted form data
  const template = req.body.template; // Get the renaming template from the submitted form data

  // Read the contents of the specified directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.send('Unable to scan directory: ' + err); // Handle errors when reading the directory
    }

    // Loop through each file in the directory
    files.forEach((file, index) => {
      const fileExt = path.extname(file); // Get the file's extension (e.g., ".txt", ".jpg")
      const newName = template.replace('{{index}}', index + 1) + fileExt; // Create the new file name based on the template
      const oldPath = path.join(directoryPath, file); // Get the old file's path
      const newPath = path.join(directoryPath, newName); // Get the new file's path

      // Rename the file using the new path and name
      fs.renameSync(oldPath, newPath);
    });

    res.send('Files renamed successfully!'); // Send a success message back to the client
  });
});

// Create an HTTP server using Express and start listening on the specified port
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});