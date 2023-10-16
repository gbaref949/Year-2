const express = require('express')
const router = express.Router()
const ensureAuthenticated = require('../config/auth')

//home page
router.get('/',(req, res) => {
    res.render('pages/welcome')
})
//register page
router.get('/register',(req, res) => {
    res.render('pages/register')
})
//dashboard-homepage redirect
router.get('/dashboard',(req, res) => {
    res.render('pages/dashboard', {
        user:req.user
    });
})

//if they are logged in then it displayes the dashboard and which coninsides with the passpoart serialized and deserialized
module.exports = router