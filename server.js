const exp = require('express')
const app = exp()
const mongoose = require('mongoose')
const session = require("express-session");


app.use(
    session({
      secret: "ALu_gobi_secret_key",
      resave: true,
      saveUninitialized: true,
      cookie: { httpOnly: true }
    })
  );

const server = require('http').createServer(app)
 
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));

const connect = mongoose.connect('mongodb://localhost/certi_app' , {useNewUrlParser : true , useUnifiedTopology : true})
 .then(() => console.log('mongodb connected ...'))
 .catch((err) => console.log(err))

app.use('/api' , require('./routes/api').route)

 server.listen(5000 , () => {
     console.log('server started')
 })
