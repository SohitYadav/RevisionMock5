const mongoose=require('mongoose');

const doctorSchema=new mongoose.Schema({
    name:String,
    image:String,
    specialization:String,
    experience:Number,
    location:String,
    date:Date,
    slots:Number,
    fee:Number
})

module.exports=mongoose.model('Doctor',doctorSchema);