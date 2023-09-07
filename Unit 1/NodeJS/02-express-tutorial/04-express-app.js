const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile.pathresolve(path.join(__dirname, '/public/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile.pathresolve(path.join(__dirname, '/public/about.html'));
});

app.all('*', (req, res) => {
  res.status(404).send('<h1>Resources Not Found</h1>');
});

app.listen(5000, () => {
  console.log('Server is runnign on port 500...');
});
