const express = require('express');
const multer = require('multer');
const {registerUsers, loginUsers, userData, getAllData, validateEmail } = require('./controllers/signUpController');
const { timeTable, getTimeTable, deleteTimeTable, editTimeTable, itemsEach } = require('./controllers/timeTableController');
const { saveToDoList, getToDoList, deleteToDo, editToDo } = require('./controllers/todoListController');
const { newPost, getNewsFeedController, deleteNewsFeed } = require('./controllers/blogsController');
const router = express.Router();
router.use(express.json());
const {storage} = require("./upload");
const { createMessage, getMessage } = require('./controllers/chatsController');
const upload =  multer({storage});


// Routers
router.post('/validate', validateEmail);
router.post('/register', registerUsers);
router.post('/login', loginUsers);
router.get('/datas', getAllData);
router.post('/timeTable', timeTable);
router.get('/each', getTimeTable);
router.post('/delete', deleteTimeTable);
router.post('/editTimeTable', editTimeTable);
router.post('/items', itemsEach);
router.post('/todo', saveToDoList);
router.get('/gettodo', getToDoList);
router.post('/deleteTodo', deleteToDo);
router.post('/editTodo', editToDo);
router.post('/new-post', upload.single('file'), newPost);
router.get('/getNewsFeed', getNewsFeedController);
router.post('/deletePost', deleteNewsFeed);
router.post('/msg', createMessage);
router.get('/get/chat/msg/:user1Id/:user2Id', getMessage);

module.exports = router;