const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
      user_id:{
            type: String,
            require
      },
      item:{
            type: String,
            require
      },
      date:{
            type: String,
            require
      },
      time:{
            type: String,
            require
      },
      subTime:{
            type: Date,
            default:Date.now()
      }

});

const ToDoList = mongoose.model("todolist", todoSchema);
module.exports = ToDoList;