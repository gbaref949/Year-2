const express = require('express');
const app = express();
const port = 5000

app.set('view engine', 'ejs');//creates a rule that the view engine will be ejs
//since we are using ejs we need views folder to view anything

const user ={//combines data with templates
    firstName: 'Tim',
    lastName: 'Smith',
}

app.get('/', (req, res) => {
    res.render('pages/index', {user:user});//routes at your views folder
    //when passing through data through the render
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})