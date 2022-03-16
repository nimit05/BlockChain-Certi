const { Router} = require('express');
const { json } = require('express/lib/response');
const Web3 =require('web3')
const route = Router()

const { spawn } = require("child_process");
// const child = spawn('dir', [], {shell: true});

route.post('/', async (req, res) => {
    
    var ab = (req.body) 
    // console.log(ab)
    try {
        const pythonProcess =  spawn('python3', [__dirname +"/pythonBlock/brownie/scripts/deploy.py", ab.name, ab.rollNo,
            ab.result, ab.sem1, ab.sem2, ab.gender, ab.university]);
     
        res.send(pythonProcess);
        
    }
    catch (err) {
        console.log(err)
    }
    
})




module.exports = {route}