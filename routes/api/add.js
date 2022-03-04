const { Router} = require('express')
const Web3 =require('web3')
const route = Router()

route.post("/",async(req,res)=>{
    try {
        const web3 = new Web3('http://0.0.0.0:8545')
        const abi=[
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "__name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "__rollNo",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "__result",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "__sem1",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "__sem2",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "__gender",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "__university",
                        "type": "string"
                    }
                ],
                "name": "addStudent",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "database",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "rollNo",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "sem1",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "sem2",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "result",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "university",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "gender",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "exist",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ]
        const address= "0x77cb506522905E99B1b1538FD587E2409C6E1dCE"
        const contract = new web3.eth.Contract(abi, address)
        const a = req.body;
        let ab = await contract.methods.addStudent(a.name,a.rollNo,a.sem1,a.sem2,a.result,a.university,a.gender).send({
            from:"0x7Bb57AB573d8aDC19721b76414565B9eC811ff1C",
            gas:3000000,
        })
        if(ab){
            res.send("Successful")
        }
    } catch (error) {
        console.log(error.message)
    }
})




module.exports = {route}