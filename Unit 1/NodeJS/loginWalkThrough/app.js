const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const morgan = require('morgan');
const passport = require('passport');
require("./config/passport")(passport);
require("dotenv").config();
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const expressEJSLayout = require('express-ejs-layout');
require('./db/connect')
const connectDB = require('./db/connect');
const port = 5000

try{
   mongoose.connect(process.env.MONGO_URI, {useNewURLParser:true, useUnifiedTopology:true})
   .then(()=> {console.log(`connect on port ${port}: ${process.env.PORT}`)})
   .catch((err)=>{console.log(err)})
}catch(error){
    console.log(error)
}

//use this for help https://www.npmjs.com/package/ejs

app.set('view engine', 'ejs');//creates a rule that the view engine will be ejs
//since we are using ejs we need views folder to view anything

const user ={//combines data with templates
    firstName: 'Tim',
    lastName: 'Brown',
}

app.get('/', (req, res) => {
    res.render('pages/index', {user:user});//routes at your views folder
    //when passing through data through the render
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})