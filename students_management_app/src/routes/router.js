const Router = require('express').Router();
const {getMainPage,healthCheck}= require('../controllers/mainpage');
const studentsController=require('../controllers/students');
const staffsController=require('../controllers/staffs');
const settingsController=require('../controllers/settings');
const studentsValidators = require('../validations/students');
const staffsValidators = require('../validations/staffs');

/**
 * Homepage Router
 **/ 
Router.get('/home',getMainPage)
Router.get('/health-check',healthCheck)

/**
 * Students Router
 **/ 
Router.get('/students',studentsController.getIndex)
Router.get('/students/add',studentsController.getAddStudent)
Router.post('/students/add', studentsValidators.addStudent, studentsController.addStudent)   // Note : middleware -- validators.addStudent
Router.post('/students/search', studentsValidators.searchStudent, studentsController.searchStudent)
Router.post('/students/update', studentsValidators.updateStudent, studentsController.updateStudent)
Router.get('/students/delete/:student_id',studentsController.deleteStudent)
Router.get('/students/details',studentsController.getStudentData)

/**
 * Staffs Router
 **/ 
Router.get('/staffs',staffsController.getIndex)
Router.get('/staffs/add',staffsController.getAddStaff)
Router.post('/staffs/add',staffsValidators.addStaff,staffsController.addStaff)
Router.post('/staffs/search', staffsValidators.searchStaff, staffsController.searchStaff)
Router.post('/staffs/update', staffsValidators.updateStaff, staffsController.updateStaff)
Router.get('/staffs/delete/:staff_id',staffsController.deleteStaff)
Router.get('/staffs/details',staffsController.getStaffsDetails)

/**
 * Settings Router
 **/ 
Router.get('/settings',settingsController.getIndex)


module.exports=Router 