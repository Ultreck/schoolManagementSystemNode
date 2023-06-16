const newsFeed = require("../models/blogModel");


const newPost  = (req, res) => {
const {more, firstname, lastname, user_id} = req.body;
const {filename, path} = req.file;
newsFeed.create({path, filename, more, firstname, lastname, user_id}).then((result) => {
      res.json({
            status: 200,
            result: result,
            success: true
      });
}).catch((error) => {
      res.json({
            status: 400,
            result:error,
            success:false
      })
})
}

const getNewsFeedController = (req, res) => {
      newsFeed.find().then(result => {
            res.json({
                  status: 200,
                  result: result,
                  success: true
            });
      }).catch((err) => {
            res.json({
                  status: 400,
                  result: err,
                  success: false
            });
      })
}

const deleteNewsFeed = (req, res) => {
      const {id} = req.body;
      console.log(id); 
      newsFeed.deleteOne({_id:id}).then(result => {
            res.json({
                  status:200,
                  result: result,
                  success: true
            })
      }).catch(err => {
            res.json({
                  status:400,
                  result:err,
                  success:false
            })
      })
}


module.exports = {newPost, getNewsFeedController, deleteNewsFeed}