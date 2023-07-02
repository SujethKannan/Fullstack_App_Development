const Router = require('express').Router();
const {getMainPage,healthCheck}= require('../controllers/mainpage');
const studentsController=require('../controllers/students');
const staffsController=require('../controllers/staffs');
const validators = require('../validations/validators')

Router.get('/home',getMainPage)
Router.get('/health-check',healthCheck)

Router.get('/students',studentsController.getIndex)
Router.get('/students/add',studentsController.getAddStudent)
Router.post('/students/add', validators.addStudent, studentsController.addStudent)   // Note : middleware -- validators.addStudent
Router.post('/students/search', validators.searchStudent, studentsController.searchStudent)
Router.post('/students/update', validators.updateStudent, studentsController.updateStudent)

Router.get('/staffs',staffsController.getIndex)
Router.get('/staffs/add',staffsController.getAddStaff)
Router.post('/staffs/add',validators.addStaff,staffsController.addStaff)
Router.post('/staffs/search', validators.searchStaff, staffsController.searchStaff)
Router.post('/staffs/update', validators.updateStaff, staffsController.updateStaff)


module.exports=Router 