const notificationActions = require("../models/actionsModel");

const allNotificationActions = (req, res) => {
      const {name, action, path, more, posterId, liked} = req.body
      notificationActions.create({name:name, action:action, path:path, more:more,  poster_id:posterId, user_id:liked}).then(result => {
            res.status(200).json(result);
      })
};

const getNotifictionActions = (req, res) => {
      notificationActions.find().sort({createdAt:-1}).then(result => 
            res.status(200).json(result)
            ).catch((err) => 
            res.status(400).json("Not found"));
}
module.exports = {allNotificationActions, getNotifictionActions};