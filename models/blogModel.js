const mongoose =  require("mongoose");

const commentSchema = new mongoose.Schema({
      text:{type: String, require: true},
      postedBy:{type:mongoose.Schema.Types.ObjectId},
      fullName:{type:String, require: true},
      path:{type:String, require: true},
      gender:{type:String, require:true},
},{timestamps: true})

const newsFeedSchema = new mongoose.Schema({
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
      comments:[commentSchema],
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