const models= require('../models/students');
const constatnts = require('../config/constatnts')

module.exports={
    getIndex:function(request,response){
       return  response.render('students/index')
    },
    getAddStudent:function(request,response){
        return response.render('students/addStudent')
    },
    addStudent: async function(request,response){
        try{
            const name = request.body.name;
            const stream = request.body.stream;
            const department = request.body.department;
            const batch = request.body.batch;
            const dob = request.body.dob;
            const mobile_no = request.body.mobile_no;

            const data ={
                name:name,
                stream:stream,
                department:department,
                batch:batch,
                dob:dob,
                mobile_no:mobile_no
            }

            const result = await models.insertStudent(data);
            if(result===constatnts.resultFlag.success){
               return  response.render('students/index')
            }
              return response.render('students/addStudent')

        }catch(error){

            console.log('[addStudent Controller] error:',error);
            return response.render('students/index')

        } 
    }
}