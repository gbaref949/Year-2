const express = require('express')
const app = express()
let {people} = require('./data')

//static assets
app.use(express.static('./public'))
