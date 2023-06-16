const msgChat = require("../models/chatModel");

// create message
const createMessage = (req, res) => {
const {fro, to, message } = req.body;
msgChat.create({
      message: message,
      chatUsers: [fro, to],
      sender: fro
}).then(result => {
      res.status(200).json(result);
}).catch(err => {
      res.status(500).json(err, "Internal server error");
})
}

// get message
const getMessage = (req, res) => {
const fro =  req.params.user1Id;
const to =  req.params.user2Id;
// {chatUsers:[fro, to]}
msgChat.find({
      chatUsers:{$all:[fro, to]}
}).sort({updatedAt: 1}).then(result => {
    const allMsg =  result.map((msg) => {
            return {
                  mySelf: msg.sender.toString() === fro,
                  message: msg.message,
                  ids :msg.chatUsers,
            }
      });
      res.status(200).json(allMsg);
}).catch((error) => {
      return res.status(500).json("Internal server error");
})
}
module.exports ={ createMessage, getMessage};