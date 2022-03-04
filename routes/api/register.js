const { Router} = require('express')
const route = Router()
const {register} = require("../../controller/register")

route.post("/" , async(req,res) => {
    try {
        const b = req.body;
       const a = await register(b.name,b.email,b.password);
       console.log(a)
       res.send(a);
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

module.exports = {route}