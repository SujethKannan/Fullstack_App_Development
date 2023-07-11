const studentsmodels= require('../models/students');
const settingsmodels= require('../models/settings');
const constants = require('../config/constants');
const {validationResult} = require('express-validator');
const {bloodGroup} = require('../config/studentDataConfig');
const fastcsv = require('fast-csv');
const moment = require ('moment');
const path = require('path');
const fs = require('fs');

module.exports={
    getIndex:function(request,response){
       return  response.render('students/index', {errors:{},fileName:null})
    },
    getAddStudent:async function(request,response){
        const departmentData = await getAllDepartments();
        const streamData = await getAllStreams();
        return response.render('students/addStudent', {errors:{}, bloodGroup:bloodGroup, departmentData:departmentData , streamData:streamData})
    },
    addStudent: async function(request,response){
        try{ 
            const departmentData = await getAllDepartments();
            const streamData = await getAllStreams();
            const validationErrors = validationResult(request);
            // console.log('validationErrors >>>',validationErrors);

            if(!validationErrors.isEmpty()){
                return response.render('students/addStudent',{
                    errors : validationErrors.mapped(),
                    bloodGroup:bloodGroup,
                    departmentData:departmentData , 
                    streamData:streamData
                })
            }

            const name = request.body.name;
            const stream = request.body.stream;
            const department = request.body.department;
            const batch = request.body.batch;
            const dob = request.body.dob;
            const mobile_no = request.body.mobile_no;
            const age = request.body.age;
            const address = request.body.address;
            const blood_group = request.body.blood_group;

            const data ={
                name:name,
                stream:stream,
                department:department,
                batch:batch,
                dob:dob,
                mobile_no:mobile_no,
            }

            const result = await studentsmodels.insertStudent(data);
            if(result===constants.resultFlag.error){
               return response.render('students/addstudent',{errors:{},bloodGroup:bloodGroup,departmentData:departmentData , streamData:streamData})
            }
              const studentID= result.result.ID;

              const addlData = {
                student_id: studentID,
                age:age,
                address:address,
                blood_group:blood_group
            }

              const addlResult = await studentsmodels.insertStudentDetail(addlData);
              if(addlResult===constants.resultFlag.error){
               return response.render('students/addstudent',{errors:{},bloodGroup:bloodGroup, departmentData:departmentData , streamData:streamData})
              }
               return response.render('students/index', {errors:{opsError:'Data Added Successfully'},fileName:null})

        }catch(error){

            console.log('[addStudent Controller] error:',error);
            return response.render('students/index',{errors:{opsError:'Something Went wrong while adding student'},fileName:null})

        } 
    },

    searchStudent : async function(request,response){
        try {
            const departmentData = await getAllDepartments();
            const streamData = await getAllStreams();
            const validationErrors = validationResult(request);
            // console.log('validationErrors >>>',validationErrors);
            if(!validationErrors.isEmpty()){return response.render('students/index',{errors : validationErrors.mapped(),fileName:null})}
            const studentId = request.body.student_id;
            const studentData = await studentsmodels.getStudentById(studentId)
         if(!studentData){
            return response.render('students/index',{errors : {no_Data:'Students data does not exists'},fileName:null})}
        return response.render('students/searchstudent',{data: studentData, errors:{},bloodGroup:bloodGroup,departmentData:departmentData,streamData:streamData })
    }
        catch (error) {
            console.log('[searchStudent Controller] error:',error);
            return response.render('students/index',{errors:{opsError:'Something Went wrong while searching student'},fileName:null})            
        }
    },

    updateStudent : async function(request,response){
        try {
            const departmentData = await getAllDepartments();
            const streamData = await getAllStreams();
            const id = request.body.id;
            const studentData = await studentsmodels.getStudentById(id);
            const validationErrors = validationResult(request);
            // console.log('validationErrors >>>',validationErrors);
            if(!validationErrors.isEmpty()){
                return response.render('students/searchstudent',{
                    errors : validationErrors.mapped(),
                    data : studentData,
                    bloodGroup:bloodGroup,
                    departmentData:departmentData,
                    streamData:streamData
                })
            }

            const name = request.body.name;
            const stream = request.body.stream;
            const department = request.body.department;
            const batch = request.body.batch;
            const dob = request.body.dob;
            const mobile_no = request.body.mobile_no;
            const email = request.body.email;
            const age = request.body.age;
            const address = request.body.address;
            const blood_group = request.body.blood_group;

            const data ={
                name:name,
                stream:stream,
                department:department,
                batch:batch,
                dob:dob,
                mobile_no:mobile_no,
                email:email
            }

            const addlData = {
                student_id:id,
                age:age,
                address:address,
                blood_group:blood_group
            }

        const updatedresult = await studentsmodels.updateStudentsById(data,id);
        const updatedaddlResult = await studentsmodels.updateStudentsDtlsById(addlData,id);
        if(updatedresult === constants.resultFlag.error){
            return response.render('students/searchstudent',{
                errors : {updateError: 'unable to update data'},
                data : studentData,
                bloodGroup:bloodGroup,
                departmentData:departmentData,
                streamData:streamData
            })
        }
        const updatedstudentData = await studentsmodels.getStudentById(id);        
        return response.render('students/searchstudent',{
            errors : {successmsg : 'Data updated successfully'},
            data : updatedstudentData,
            bloodGroup:bloodGroup,
            departmentData:departmentData,
            streamData:streamData
        })

        } catch (error) {
            console.log('[updateStudent Controller] error:',error);
            return response.render('students/index',{errors:{opsError:'Something Went wrong while updating student details'},fileName:null})
        }
    },
    deleteStudent : async function(request,response){
        try {
            const studentId = request.params.student_id;
            const result = await studentsmodels.deleteStudentsById(studentId);
            if(result === constants.resultFlag.error){
                return response.render('students/index',{errors:{opsError:'Something Went wrong while deleting student'},fileName:null})
            }
            return response.render('students/index',{errors:{opsError:'Student Deleted Successfully'},fileName:null})
        } catch (error) {
            console.log('[deleteStudent Controller] error:',error);
            return response.render('students/index',{errors:{opsError:'Something Went wrong while deleting student'},fileName:null})
        }
    },
    getStudentsData : async function(request,response){
        try {
            const data = await studentsmodels.getStudentsdata();
            return response.render('students/details-page',{data:data});
        } catch (error) {
            console.log('[getStudentData Controller] error:',error);
            return response.render('students/index',{errors:{opsError:'Something Went wrong while fetching students data'},fileName:null});
            
        }
    },
    exportStudentsData : async function(request,response){
    try {
        const data = await studentsmodels.getStudentsdata();
        const exportDir = path.resolve(__dirname,'../','public/exports');
        const time = moment().utcOffset('+5:30').format('YYYYMMDDHHmmss');
        const fileName = 'StudentData_' + String(time) + '.csv';
        const endpath = exportDir + '/' + fileName;
        //console.log(data);
        const ws = fs.createWriteStream(endpath);
        fastcsv.write(
            data,
            {headers:true}
        ).on('finish',()=>{
            return response.render('students/index',{errors:{},fileName:fileName})
        }).pipe(ws)
    } catch (error) {
        return response.render('students/index',{errors:{exportError:'Something Went wrong while exporting students report'},fileName:null});
    }
}

}

const getAllDepartments = async ()=>{
    try {
        return await settingsmodels.getDepartment();
    } catch (error) {
        console.log('[getAllDepartments] error:',error);
        return null;        
    }
 }

 const getAllStreams = async ()=>{
    try {
        return await settingsmodels.getStream();
    } catch (error) {
        console.log('[getAllStreams] error:',error);
        return null;        
    }
 }