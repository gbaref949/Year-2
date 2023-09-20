const express = require('express')
const router = express.Router()

//very insecure of a login setup
router.post('/',(req, res) => {
    console.log(req.body)
    const {name} = req.body
    if(name == "Georgie"){
        return res.json({status:200, data:name})
    }
    res.send("Please Provide Crenditials")
})

module.exports = router