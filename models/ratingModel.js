const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
      rating:{
            type: Number,
            require: true
      },
      review:{
            type: String,
            require: true
      },
      user_id:{
            type: String,
            require: true
      },
      name:{
            type: String,
            require: true
      },
      path:{
            type: String,
            require: true
      },
}, {timestamps:true})
const ratingModel = mongoose.model("ratings", ratingSchema);
module.exports = ratingModel;