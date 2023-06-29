const models= require('../models/staffs');
const constatnts = require('../config/constatnts')

module.exports={
    getIndex:function(request,response){
       return  response.render('staffs/index')
    },
    getAddStaff:function(request,response){
        return response.render('staffs/addStaff')
    },
    addStaff: async function(request,response){
        try{
            const name = request.body.name;
            const subject = request.body.subject;
            const department = request.body.department;
            const mobile_no = request.body.mobile_no;

            const data ={
                name:name,
                subject:subject,
                department:department,
                mobile_no:mobile_no
            }

            const result = await models.insertStaff(data);
            if(result===constatnts.resultFlag.success){
               return  response.render('staffs/index')
            }
              return response.render('staffs/addStudent')

        }catch(error){

            console.log('[addStaffs Controller] error:',error);
            return response.render('staffs/index')

        } 
    }
}