const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const models = require("../models");

const SALT_ROUNDS = 10;




router.post("/login", async(req, res) => {
    try {
      const {credentials} = req.body;
      
      let user = await models.User.findOne({
        where: {
          login: credentials.username
        }
      })
      if(user != null){
        bcrypt.compare(credentials.password, user.password, (error, result) => {
  
          if(result){
            //create session 
            if(req.session) {
              req.session.user = {userId: user.id};
              res.send({direction: "/calendar"});
            }
          }else {
            res.send({direction: "/login", message: "Incorrect username or password"})
          }
        })
      } else {
        res.send({direction: "/login", message: "Incorrect username or password"})
      }
    } catch (error) {
      console.log(message.error);
    }
  });

  router.post("/register", async(req, res) => {
    console.log(req.body);
    try {
      const {credentials} = req.body;
      let persistedUser = await models.User.findOne({
        where: {
          login: credentials.username
        } 
      });
      if(persistedUser == null) {
  
        bcrypt.hash(credentials.password, SALT_ROUNDS, async(error, hash) => {
  
          if(error) {
            res.send({direction: "/register", message: "Error creating user!"});
          }
          let user = models.User.build({
            login: credentials.username,
            name: credentials.name,
            lastname: credentials.lastname,
            email: credentials.email,
            password: hash
          });
  
          let savedUser = await user.save();
          if(savedUser != null) {
            res.send({direction: "/login", message: "User has been created"})
          }else{
            res.send({direction: "/register", message: "User already exists"})
          }
  
        });
  
      }else{
        res.send({direction: "/register", message: "User already exists"})
      }
    } catch (error) {
      console.log(error.message);
    }
  });

module.exports = router;