const ToDoList = require("../models/todoModel");


const saveToDoList = (req, res) => {
      const {user_id, item, date, time} = req.body;
      console.log(user_id, item, date, time);
      ToDoList.create({user_id, item, date, time}).then((result) => {
            res.json({
                  result: result,
                  status: 200,
                  success: true,
            });
            console.log(result);
      }).catch((error) => {
            res.json({
                  result: error,
                  status: 404,
                  success: false
            })
      })
      
}

const getToDoList = (req, res) => {
      ToDoList.find().then((result) => {
            res.json({
                  result:result,
                  status: 200,
                  success: true
            })
      }).catch((error) => {
            res.json({
                  result: error,
                  status: 404,
                  success: false
            })
      })
}

const deleteToDo = (req, res) => {
const {id} = req.body;
ToDoList.deleteOne({_id:id}).then((result) =>{
      res.json({
            status:200,
            result:result,
            success:true
      })
      console.log(result);
}).catch((error) => {
      console.log(error);
})
}

const editToDo = (req, res) => {
const {selected, _id} = req.body;
console.log(selected, _id);
ToDoList.updateOne({ _id: _id }, { $set: selected }).then(result => {
      res.json({
            status:200,
            success: true,
            result:result
      })
}).catch((err) => {
      res.json({
            status:404,
            success: false,
            result:err
      })
})
}
module.exports = {saveToDoList, getToDoList, deleteToDo, editToDo};