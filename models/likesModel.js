const mongoose = require("mongoose");

const likeData = mongoose.Schema({
      liked: {
            type: String,
            require: true
      },
      poster: {
            type: String,
            require: true
      },
      post: {
            type: String,
            require: true
      },
})
const likeModel = mongoose.model('likes', likeData);
module.exports = likeModel