const mongoose =  require("mongoose");

const actionSchema = new mongoose.Schema({
      name:{
            type: String,
            require:true
      },
      action:{
            type: String,
            require:true
      },
      path:{
            type: String,
            require:true
      },
      more:{
            type: String,
            require:true
      },
      poster_id:{
            type: String,
            require:true
      },
      user_id:{
            type: String,
            require:true
      },
},{timestamps: true});
const notificationActions = mongoose.model('notification_actions', actionSchema);
module.exports = notificationActions;