const TimeTable = require("../models/timeTableModel");

const timeTable = (req, res) => {
      const {user_id, starttime, endtime,  monday, teusday, wednesday, thursday, friday} = req.body;
      console.log( {user_id, starttime, endtime,  monday, teusday, wednesday, thursday, friday});

      TimeTable.create({user_id, starttime, endtime, monday, teusday, wednesday, thursday, friday}).then(resp => {
            res.json({
                  status: "success",
                  response: resp,
                  code: 200
            })
            console.log(resp);
      });
}

const getTimeTable = (req, res) => {
      TimeTable.find().then((resp) => {
            res.json({
                  status_code : 200,
                  success: true,
                  response: resp
            })
            // console.log(resp);
      })
}

const deleteTimeTable = (req, res) => {
      const {index} = req.body;
      TimeTable.deleteOne({_id : index}).then(result => {
           res.json(result);
      }).catch(err => {
            console.error('Error deleting document:', err);
      })
}
const editTimeTable = (req, res) => {
      const {_id, selected} = req.body;
      console.log(_id, selected);
      TimeTable.updateOne({_id : _id}, {$set: selected}).then(result => {
           res.json(result);
      }).catch(err => {
            console.error('Error deleting document:', err);
      })
}
const itemsEach = (req, res) => {
      const {user_id} = req.body;
      TimeTable.find({user_id:user_id}).then(result => {
            res.json({
                  data:result,
                  success: true,
                  status: 200
                  });
            console.log(result);
      }).catch(err => {
            res.json({
                  message:err,
                  success: false,
                  status: 404
                  });
            console.log(err);
      }) 
}
module.exports = {timeTable, getTimeTable, deleteTimeTable, editTimeTable, itemsEach};