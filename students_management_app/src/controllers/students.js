const models= require('../models/students');
const constants = require('../config/constants')
const {validationResult} = require('express-validator')

module.exports={
    getIndex:function(request,response){
       return  response.render('students/index', {errors:{}})
    },
    getAddStudent:function(request,response){
        return response.render('students/addStudent', {errors:{}})
    },
    addStudent: async function(request,response){
        try{ 
            const validationErrors = validationResult(request);
            // console.log('validationErrors >>>',validationErrors);

            if(!validationErrors.isEmpty()){
                return response.render('students/addStudent',{
                    errors : validationErrors.mapped()
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

            const result = await models.insertStudent(data);
            if(result===constants.resultFlag.error){
               return response.render('students/addstudent',{errors:{}})
            }
              const studentID= result.result.ID;

              const addlData = {
                student_id: studentID,
                age:age,
                address:address,
                blood_group:blood_group
            }

              const addlResult = await models.insertStudentDetail(addlData);
              if(addlResult===constants.resultFlag.error){
               return response.render('students/addstudent',{errors:{}})
              }
               return response.render('students/index', {errors:{}})

        }catch(error){

            console.log('[addStudent Controller] error:',error);
            return response.render('students/index',{errors:{opsError:'Something Went wrong while adding student'}})

        } 
    },

    searchStudent : async function(request,response){
        try {
            const validationErrors = validationResult(request);
            // console.log('validationErrors >>>',validationErrors);
            if(!validationErrors.isEmpty()){
                return response.render('students/index',{
                    errors : validationErrors.mapped()})
            }
            const studentId = request.body.student_id;
            const studentData = await models.getStudentById(studentId)
         if(!studentData){
            return response.render('students/index',{
                errors : {no_Data:'Students data does not exists'}})

        }
        return response.render('students/searchstudent',{data: studentData, errors:{} })
    }
        catch (error) {
            console.log('[searchStudent Controller] error:',error);
            return response.render('students/index',{errors:{opsError:'Something Went wrong while searching student'}})            
        }
    },

    updateStudent : async function(request,response){
        try {
            const id = request.body.id;
            const studentData = await models.getStudentById(id);
            const validationErrors = validationResult(request);
            // console.log('validationErrors >>>',validationErrors);
            if(!validationErrors.isEmpty()){
                return response.render('students/searchStudent',{
                    errors : validationErrors.mapped(),
                    data : studentData
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

        const updatedresult = await models.getStudentById(data,id);
        const updatedaddlResult = await models.updateStudentDetail(addlData,id);
        if(updatedresult === constants.resultFlag.error){
            return response.render('students/searchStudent',{
                errors : {updateError: 'unable to update data'},
                data : studentData
            })
        }
        const updatedstudentData = await models.getStudentById(id);        
        return response.render('students/searchStudent',{
            errors : {successmsg : 'Data updated successfully'},
            data : updatedstudentData
        })

        } catch (error) {
            console.log('[updateStudent Controller] error:',error);
            return response.render('students/index',{errors:{opsError:'Something Went wrong while updating student details'}})
        }
    },
    deleteStudent : async function(request,response){
        try {
            const studentId = request.params.student_id;
            const result = await models.deleteStudentsById(studentId);
            if(result === constants.resultFlag.error){
                return response.render('students/index',{errors:{opsError:'Something Went wrong while deleting student'}})
            }
            return response.render('students/index',{errors:{opsError:'Student Deleted Successfully'}})
        } catch (error) {
            console.log('[deleteStudent Controller] error:',error);
            return response.render('students/index',{errors:{opsError:'Something Went wrong while deleting student'}})
        }
    }
}