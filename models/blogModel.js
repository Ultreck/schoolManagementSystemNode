const mongoose =  require("mongoose");

const newsFeedSchema = mongoose.Schema({
      senderImg: {
            type: String,
            require: true
      },
      path: {
            type: String,
            require: true
      },
      filename: {
            type: String,
            require: true
      },
      more: {
            type: String,
            require: true
      },
      firstname: {
            type: String,
            require: true
      },
      lastname: {
            type: String,
            require: true
      },
      likes:[{type:mongoose.Schema.Types.ObjectId}],
      follow:[{type:mongoose.Schema.Types.ObjectId}],
      comments:[{
            text:String,
            postedBy:{type:mongoose.Schema.Types.ObjectId},
            fullName:String,
            path:String,
            gender:String,

      }],
      user_id: {
            type: String,
            require: true
      },
      time: {
            type: Date,
            default: Date.now()
      },

}, {timestamps: true});

const newsFeed = mongoose.model("newsfeed", newsFeedSchema);
module.exports = newsFeed;