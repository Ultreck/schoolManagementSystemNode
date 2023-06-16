const mongoose = require('mongoose');

const timeTableSchema = mongoose.Schema({
      user_id:{
            type: String,
           require
      },
      starttime:{
            type: String,
           require
      },
      endtime:{
            type: String,
           require
      },
      monday:{
            type: String,
           require
      },
      teusday:{
            type: String,
           require
      },
      wednesday:{
            type: String,
           require
      },
      thursday:{
            type: String,
           require
      },
      friday:{
            type: String,
           require
      },
});

const TimeTable = mongoose.model("timeTable", timeTableSchema);
module.exports = TimeTable;