const ratingModel = require("../models/ratingModel");


const userReview = (req, res) => {
      const {rating, fullName, review, user_id, path} = req.body;
      // console.log(rating, fullName, review, user_id, path);
      ratingModel.findOne({user_id:user_id}).then(found => {
            console.log(found);
            if(found){
                  ratingModel.updateOne({rating:rating}).then(finalFound => {
                        console.log(finalFound);
                        res.status(200).json(finalFound);
                  })
            }else{
                  ratingModel.create({rating, name:fullName, review, user_id, path}).then(result => {
                        console.log(result);
                        res.status(200).json(result);
                  }).catch((error) => {
                        console.log(error);
                        res.status(500).json("Internal Server Error");
                  })
            }
      }).catch((err) => {
            console.log(err);
      })
}

const getUserReview = (req, res) => {
      ratingModel.find().then(result => {
            res.status(200).json(result);
      }).catch((err) => {
            res.status(500).json("Internal Server Error")
      })
}

module.exports = {userReview, getUserReview};