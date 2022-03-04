const res = require("express/lib/response");
const {User} = require("../db")

async function register(name,email,password){
    try {
        console.log("hi")
        const a = await User.create({
            name,
            email,
            password
        })

        return a;
    } catch (error) {
        return error;
    }
}

module.exports = {register}