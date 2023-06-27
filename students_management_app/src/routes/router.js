const Router = require('express').Router();
const {getMainPage,healthCheck}= require('../controllers/mainpage')
const studentsController=require('../controllers/students')


Router.get('/home',getMainPage)
Router.get('/health-check',healthCheck)

Router.get('/students',studentsController.getIndex)
Router.get('/students/add',studentsController.getAddStudent)
Router.post('/students/add',studentsController.addStudent)

module.exports=Router 