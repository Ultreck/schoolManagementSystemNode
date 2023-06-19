const {compare} = require('bcrypt');
const bcrypt = require("bcrypt")
const dotenv = require('dotenv');
const Student = require('../models/usersModel');
dotenv.config();

const validateEmail = (req, res) =>{
      const {firstname, lastname, email, password, gender } = req.body
      Student.findOne({email}).then((resp) => {
            if(resp){
                  res.json({
                        status:400,
                        message:"email exist",
                        success:false,
                  })
            }else{
                  res.json({
                        status: 200,
                        message: "success",
                        success: true
                  })
            }

            })
      }


const registerUsers = (req, res) => {
      const {firstname, lastname, email, gender, password, contact, address, city, country, courses, faculty, level, matric, program, region} = req.body;
      console.log(firstname, lastname, email, gender, password, contact, address, city, country, courses, faculty, level, matric, program, region);
                  Student.create({firstname, lastname, email, gender, password, contact,  address, city, country, courses, faculty, level,matric, program, region})
                  .then(ret =>{
                        console.log(ret);
                        res.json({
                              statuscode:200,
                              success: true ,
                              data: ret
                        })
                  }).catch(err =>{ 
                        res.json({
                              status: err,
                              success:false,
                        })
                        console.log(err)
                  })
            };

const loginUsers = (req, res) => {
      const {email, password} = req.body;
      // getting the matched users
      Student.findOne({email}).select("+password").then(resp => {
            // comparing the user's password
            if(resp){  
                  bcrypt.compare(password, resp.password).then((ress) => {
                        if(ress){
                              res.json({
                                                status:200,
                                                success:true,
                                                message:"login successful",
                                                data:resp._id
                                          })
                        }else{
                              res.json({
                                                status:400,
                                                success:false,
                                                message: "Password is incorrect",
                                                
                                          })
                        }
                        console.log(ress);
                  });
            }else{
                  res.json({
                        status:401,
                        success:false,
                        message: "Account does not exist",
            })
            }
           
      })
}

const userData = (req, res) =>{
      const {id} = req.body;
      Student.findOne(id).then((resp) =>{
            console.log(resp);
            res.json(resp)
      }).catch((error) => {
            res.json({
                  status: 404,
                  success: false,
                  message: error
            })
      })
}



const  getAllData = (req, res) =>{
      Student.find().sort({updatedAt: -1}).then((resp) =>{
            res.json(resp)
      }).catch((error) => {
            res.json({
                  status: 404,
                  success: false,
                  message: error
            })
      })
}
module.exports = {registerUsers, loginUsers, userData, getAllData, validateEmail}