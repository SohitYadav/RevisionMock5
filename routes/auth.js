const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User = require('../models/User');

require('dotenv').config()
router.post('/signup',async (req,res)=>{
    try{
        const {email,password}=req.body;
        const hashedPassword=await bcrypt.hash(password,7);
        await User.create({email,password:hashedPassword});

        res.status(201).json({message:'SignUp successful'})
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});

        if(!user){
            return res.status(401).json("Login Failed");

        }

        const passwordMatch=await bcrypt.compare(password,user.password);

        if(!passwordMatch){
            return  res.status(401).send("Invalid Password")
        }

        const token=jwt.sign({email:user.email},process.env.Secrey_Key,{expiresIn:'7d'})

        res.status(200).json({token});
    }
    catch(err){
        res.status(500).json(err)

    }
})

module.exports=router;