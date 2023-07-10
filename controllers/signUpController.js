const {compare} = require('bcrypt');
const bcrypt = require("bcrypt")
const dotenv = require('dotenv');
const Student = require('../models/usersModel');
const newsFeed = require('../models/blogModel');
dotenv.config();

// function that is validating users 
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
      
      
// function that is handling the user register 
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
            
// function that is handling the user login 
const loginUsers = (req, res) => {
      const {email, password} = req.body;
      Student.findOne({email}).select("+password").then(resp => {
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

// function that is getting current user data
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



// function that is getting all data
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

// function handling the follow actions
const followingUsers = (req, res) => {
      const {posterId, liked} = req.body;
      console.log(req.body);
      // const data = {fullName:fullName, path:senderImg}
      Student.findByIdAndUpdate({_id:posterId}, {$push:{follow:liked}}, {new: true}).then(result => 
            res.status(200).json(result)
            ).catch(error =>
             (res.status(500).json(error)));

      Student.findByIdAndUpdate({_id:liked}, {$push:{following:posterId}}, {new: true}).then(result => 
            // res.status(200).json(result)
            console.log(result)
            ).catch(error =>
             (res.status(500).json(error)));

      newsFeed.updateMany({user_id:posterId}, {$push:{follow:liked}}, {new: true}).then(responese => {
      console.log(responese);
      }).catch(err => {
            console.log("Internal server error");
      });
            
}

// function handling the unfollow actions
const unFollowUsers = (req, res) => {
      const {posterId, liked} = req.body;
      console.log(req.body);
      // const data = {fullName:fullName, path:senderImg}
      Student.findByIdAndUpdate({_id:posterId}, {$pull:{follow:liked}}, {new: true}).then(result => 
            res.status(200).json(result)
            ).catch(error =>
             (res.status(500).json(error)));

      Student.findByIdAndUpdate({_id:liked}, {$pull:{following:posterId}}, {new: true}).then(result => 
            console.log(result)
            // res.status(200).json(result)
            ).catch(error =>
             (res.status(500).json(error)));

      newsFeed.updateMany({user_id:posterId}, {$pull:{follow:liked}}, {new: true}).then(responese => {
      console.log(responese);
      }).catch(err => {
            console.log("Internal server error");
      });
            
}

module.exports = {registerUsers, loginUsers, userData, getAllData, validateEmail, followingUsers, unFollowUsers}