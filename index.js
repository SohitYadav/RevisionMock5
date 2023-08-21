const express=require('express');

const mongoose=require('mongoose')

const cors=require('cors');

const authRoutes=require('./routes/auth');
require('dotenv').config()
const appointmentsRoutes=require('./routes/appointments');

const app=express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.Mongo_URL)
.then(()=>{
    console.log("Connected to mongoDB")
})
.catch((err)=>{
    console.log("Error in connecting to mongoDB")
})

app.use('/auth',authRoutes)
app.use('/',appointmentsRoutes)

app.listen(3000,()=>{
    console.log(`Server is running on port 3000`)
})