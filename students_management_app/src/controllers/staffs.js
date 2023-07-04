const models= require('../models/staffs');
const constants = require('../config/constants')
const {validationResult} = require('express-validator')


module.exports={
    getIndex:function(request,response){
       return  response.render('staffs/index',{errors:{}})
    },
    getAddStaff:function(request,response){
        return response.render('staffs/addStaff',{errors:{}})
    }, 
    addStaff: async function(request,response){
        try{
            const validationErrors = validationResult(request);
            // console.log('validationErrors >>>',validationErrors);

            if(!validationErrors.isEmpty()){
                return response.render('staffs/addStaff',{
                    errors : validationErrors.mapped()
                })
            }
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
            if(result===constants.resultFlag.success){
               return  response.render('staffs/index',{errors:{}})
            }
              return response.render('staffs/addStaff',{errors:{}})

        }catch(error){

            console.log('[addStaffs Controller] error:',error);
            return response.render('staffs/index',{errors:{opsError:'Something Went wrong while adding staff'}})

        } 
    },

    searchStaff : async function(request,response){
        try {
            const validationErrors = validationResult(request);
            // console.log('validationErrors >>>',validationErrors);
            if(!validationErrors.isEmpty()){
                return response.render('staffs/index',{
                    errors : validationErrors.mapped()})
            }
            const staffId = request.body.staff_id;
            const staffData = await models.getStaffById(staffId)
         if(!staffData){
            return response.render('staffs/index',{
                errors : {no_Data:'Staff data does not exists'}})

        }
        return response.render('staffs/searchstaff',{data: staffData, errors:{}})
    }
        catch (error) {
            console.log('[searchStaff Controller] error:',error);
            return response.render('staffs/index',{errors:{opsError:'Something Went wrong while searching staff'}})            
        }
    },

    updateStaff : async function(request,response){
        try {
            const id = request.body.id;
            const staffData = await models.getStaffById(id);
            const validationErrors = validationResult(request);
            // console.log('validationErrors >>>',validationErrors);
            if(!validationErrors.isEmpty()){
                return response.render('staffs/searchStaff',{
                    errors : validationErrors.mapped(),
                    data : staffData
                })
            }

            const name = request.body.name;
            const subject = request.body.stream;
            const department = request.body.department;
            const mobile_no = request.body.mobile_no;
            const email = request.body.email

            const data ={
                name:name,
                subject:subject,
                department:department,
                mobile_no:mobile_no,
                email:email
            }
        const updatedresult = await models.getStaffById(data,id);
        if(!updatedresult === constants.resultFlag.error){
            return response.render('staffs/searchStaff',{
                errors : {updateError: 'unable to update data'},
                data : staffData
            })
        }
        const updatedstaffData = await models.getStaffById(id);        
        return response.render('staffs/searchStaff',{
            errors : {successmsg : 'Data updated successfully'},
            data : updatedstaffData
        })

        } catch (error) {
            console.log('[updateStaff Controller] error:',error);
            return response.render('staffs/index',{errors:{opsError:'Something Went wrong while updating staff'}})            
        }
    },
    deleteStaff : async function(request,response){
        try {
            const staffId = request.params.staff_id;
            const result = await models.deleteStaffById(staffId);
            if(result === constants.resultFlag.error){
                return response.render('staffs/index',{errors:{opsError:'Something Went wrong while deleting staff'}})
            }
            return response.render('staffs/index',{errors:{opsError:'Staff Deleted Successfully'}})
        } catch (error) {
            console.log('[deleteStaff Controller] error:',error);
            return response.render('staffs/index',{errors:{opsError:'Something Went wrong while deleting staff'}})
        }
    }
}