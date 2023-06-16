const mongoose =  require("mongoose");

const messageSchema = new mongoose.Schema({
      chatUsers: {
            type: Array,
            require: true
      },
      message: {
            type: String,
            require: true
      },
      sender: {
            type: mongoose.Schema.Types.ObjectId,
            require: true
      },
},{timestamps: true});

const msgChat = mongoose.model("chats", messageSchema);
module.exports = msgChat;