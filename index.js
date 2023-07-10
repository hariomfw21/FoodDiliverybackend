const express = require('express');
const { connection } = require('./connection/connection');
const { register } = require('./routes/register');
const { login } = require('./routes/login');
const { restaurant } = require('./routes/restaurent');
const { order } = require('./routes/order');
const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("welcome");
    console.log('welcome route');
})

app.use('/',register);
app.use("/",login);
app.use("/api",restaurant);
app.use("/api",order);

app.listen(3000,async()=>{
    try {
        await connection
        console.log('aap is conneted to database');
        console.log('listening on port 3000');
    } catch (error) {
        console.log('error: ' + error);
    }
})