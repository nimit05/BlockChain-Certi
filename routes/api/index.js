const { Router} = require('express')
const route = Router()

const loginpage = require("./login").route;
const addpage = require("./add").route;
const register = require("./register").route;

route.use("/login" , loginpage)
route.use("/add" , addpage)
route.use("/register" , register)


module.exports = {route}