const Router = require('express').Router();
const {getMainPage,healthCheck}= require('../controllers/mainpage');
const studentsController=require('../controllers/students');
const staffsController=require('../controllers/staffs');

Router.get('/home',getMainPage)
Router.get('/health-check',healthCheck)

Router.get('/students',studentsController.getIndex)
Router.get('/students/add',studentsController.getAddStudent)
Router.post('/students/add',studentsController.addStudent)

Router.get('/staffs',staffsController.getIndex)
Router.get('/staffs/add',staffsController.getAddStaff)
Router.post('/staffs/add',staffsController.addStaff)


module.exports=Router 