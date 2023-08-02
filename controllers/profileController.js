
const newsFeed = require("../models/blogModel");
const Student = require("../models/usersModel");
const notificationActions = require("../models/actionsModel");
const ratingModel = require("../models/ratingModel");


const addProfile = (req, res) => {
      const {user_id, firstname, lastname, email, gender, password, contact,  address, city, country, courses, faculty, level,matric, program, region} = req.body;
      const {filename, path} = req.file;
      
            // updating user profile picture
      const editedObj = {firstname, lastname, email, gender, password, contact,  address, city, country, courses, faculty, level,matric, program, region, path, filename};
      Student.updateOne({_id:user_id}, {$set:editedObj}).then(result => {
            res.status(200).json(result);
            console.log(result);
      }).catch(err => {
            res.status(500).json(err);
            console.log(err);
      });

        // updating the user's picture on each and every post that matches the user's id
        newsFeed.updateMany({user_id: user_id}, {$set: {senderImg: path}}).then(responese => {
            console.log(responese);
      }).catch(err => {
            console.log("Internal server error");
      });

      // updating user new picture in to the notification.
      notificationActions.updateMany({user_id: user_id}, {$set: {path: path}}).then(responese => {
            console.log(responese);
      }).catch(err => {
            console.log("Internal server error");
      });

      ratingModel.updateOne({user_id: user_id}, {$set: {path: path}}).then(responese => {
            console.log(responese);
      }).catch(err => {
            console.log("Internal server error");
      });
}


const updateProfileBlog = (req, res) => {
      const {path} = req.file;
      console.log(path);
}


module.exports = {addProfile, updateProfileBlog}