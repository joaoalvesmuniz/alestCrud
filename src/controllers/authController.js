const express = require("express");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const authConfig = require('../config/auth.json')

const User = require("../models/User");

const router = express.Router();

function genereteToken(params = {}){
  

 return jwt.sign(params,authConfig.secret,{
        expiresIn: 86400,

    })
}

router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: "Usuario ja existe" });

    const user = await User.create(req.body);

    return res.send({ user,token: genereteToken({id: user.id}) });
  } catch (error) {
    return res.status(400).send({ error: "Registration failed" });
  }
});

router.post('/login', async (req,res)=>{

    const {email,password} = req.body

    const user = await User.findOne({email}).select('+password')

    if(!user) return res.status(400).send({error: "Usuario nao existe"});

    if(!await bcrypt.compare(password,user.password))
      return res.status(400).send({error: "Invalide passwrod"});


    return res.status(200).send({user,token: genereteToken({id: user.id})})
})

module.exports = (app) => app.use("/auth", router);
