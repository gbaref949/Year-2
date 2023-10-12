const express = require('express');
const app = express();
const port = 5000

app.set('view engine', 'ejs');//creates a rule that the view engine will be ejs
//since we are using ejs we need views folder to view anything

app.get('/', (req, res) => {
    res.render('pages/index');//routes at your views folder
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})