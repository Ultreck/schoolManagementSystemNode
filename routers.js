const express = require('express');
const multer = require('multer');
const {registerUsers, loginUsers, userData, getAllData, validateEmail, followingUsers, unFollowUsers } = require('./controllers/signUpController');
const { timeTable, getTimeTable, deleteTimeTable, editTimeTable, itemsEach } = require('./controllers/timeTableController');
const { saveToDoList, getToDoList, deleteToDo, editToDo } = require('./controllers/todoListController');
const { newPost, getNewsFeedController, deleteNewsFeed, likesPost, unlikesPost, commentPost } = require('./controllers/blogsController');
const router = express.Router();
router.use(express.json());
const {storage} = require("./upload");
// const {storages}  = require("./profile");
const { createMessage, getMessage } = require('./controllers/chatsController');
const { addProfile, updateProfileBlog } = require('./controllers/profileController');
const { postLikes } = require('./controllers/likesController');
const { allNotificationActions, getNotifictionActions } = require('./controllers/actionsController');
const upload =  multer({storage});
// const uploads =  multer({storages})


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
router.post("/uploadProfile", upload.single('file'), addProfile);
router.put('/likes', likesPost);
router.put('/unlike', unlikesPost);
router.put('/comment', commentPost);
router.put('/follow', followingUsers);
router.put('/unfollow', unFollowUsers);
router.post('/actions', allNotificationActions);
router.get('/notification', getNotifictionActions);

module.exports = router;