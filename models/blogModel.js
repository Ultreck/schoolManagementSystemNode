const mongoose =  require("mongoose");

const newsFeedSchema = mongoose.Schema({
      path: {
            type: String,
            require
      },
      filename: {
            type: String,
            require
      },
      more: {
            type: String,
            require
      },
      firstname: {
            type: String,
            require
      },
      lastname: {
            type: String,
            require
      },
      user_id: {
            type: String,
            require
      },
      time: {
            type: Date,
            default: Date.now()
      },

});

const newsFeed = mongoose.model("newsfeed", newsFeedSchema);
module.exports = newsFeed;