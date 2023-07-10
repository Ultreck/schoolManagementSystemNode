const likeModel = require("../models/likesModel");

const postLikes = (req, res) => {
      const {post, poster, liked} = req.body;
      
      likeModel.find({liked:liked}).then(found => {
            console.log(found);
            if(!found){
                  likeModel.create({liked, poster, post}).then(result => {
                        res.status(200).json(result);
                        console.log(result);
                  });
            };
      }).catch(err => {
            console.log("not found");
      })
      
}
const deleteLike = (req, res) => {
      const {post, poster, liked} = req.body;
      
      likeModel.find({post:post, liked:liked}).then(found => {
            if(!found){
                  likeModel.create({liked, poster, post}).then(result => {
                        res.status(200).json(result);
                        console.log(result);
                  });
            };
      }).catch(err => {
            console.log("not found");
      })
      
}
module.exports = {postLikes, deleteLike};