const { Router} = require('express')
const route = Router()
const {login} = require("../../controller/login")

route.post("/" , (req,res) => {
    try {
       const a = login(req.body);
       res.send(a);
    } catch (error) {
        
    }
})

module.exports = {route}