const newsFeed = require("../models/blogModel");
const io = require('socket.io');
const Student = require("../models/usersModel");

const newPost  = (req, res) => {
const {more, firstname, lastname, user_id, senderImg} = req.body;
const {filename, path} = req.file;
console.log(req.body);
// console.log(more, firstname, lastname, user_id, senderImg);
newsFeed.create({senderImg, path, filename, more, firstname, lastname, user_id}).then((result) => {
      res.json({
            status: 200,
            result: result,
            success: true
      });
}).catch((error) => {
      res.json({
            status: 400,
            result:error,
            success:false
      })
})
}

const getNewsFeedController = (req, res) => {
      newsFeed.find().sort({updatedAt:-1}).then(result => {
            res.json({
                  status: 200,
                  result: result,
                  success: true
            });
      }).catch((err) => {
            res.json({
                  status: 400,
                  result: err,
                  success: false
            });
      })
}


const likesPost = (req, res) => {
      const {postId, userId} = req.body;
      newsFeed.findByIdAndUpdate(req.body.post, {$push:{likes: req.body.liked}}, {new: true}).then(result => 
            res.status(200).json(result)
            ).catch(error => (res.status(500).json(error)));
            
      }
      const unlikesPost = (req, res) => {
            const {postId, userId} = req.body;
            newsFeed.findByIdAndUpdate(req.body.post, {$pull:{likes: req.body.liked}}, {new: true}).then(result => 
            res.status(200).json(result)
            ).catch(error => (res.status(500).json(error)));
            
      }
      const commentPost = (req, res) => {
            const {id, comment, liked, fullName, path, gender} = req.body;
            console.log(id, comment, liked);
            const data = {text:comment, postedBy: liked, fullName:fullName, path:path, gender:gender}
            newsFeed.findByIdAndUpdate(id, {$push:{comments: data}}, {new: true}).then(result => 
                  res.status(200).json(result)
                  ).catch(error =>
                        (res.status(500).json(error)));
                        
                  }

// function to delete your own post under your "my post" tab in profile
const deleteNewsFeed = (req, res) => {
      const {id} = req.body;
      console.log(id); 
      newsFeed.deleteOne({_id:id}).then(result => {
            res.json({
                  status:200,
                  result: result,
                  success: true
            })
      }).catch(err => {
            res.json({
                  status:400,
                  result:err,
                  success:false
            })
      })
}


module.exports = {newPost, getNewsFeedController, deleteNewsFeed, likesPost, unlikesPost, commentPost}