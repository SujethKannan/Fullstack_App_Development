const staffsmodels= require('../models/staffs');
const settingsmodels= require('../models/settings');
const constants = require('../config/constants')
const {validationResult} = require('express-validator')


module.exports={
    getIndex:function(request,response){
       return  response.render('staffs/index',{errors:{}})
    },
    getAddStaff: async function(request,response){
        const departmentData = await getAllDepartments();
        return response.render('staffs/addStaff',{errors:{}, departmentData:departmentData })
    }, 
    addStaff: async function(request,response){
        try{
            const departmentData = await getAllDepartments();
            const validationErrors = validationResult(request);
            // console.log('validationErrors >>>',validationErrors);

            if(!validationErrors.isEmpty()){
                return response.render('staffs/addStaff',{
                    errors : validationErrors.mapped(), 
                    departmentData:departmentData
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

            const result = await staffsmodels.insertStaff(data);
            if(result===constants.resultFlag.success){
               return  response.render('staffs/addStaff',{errors:{opsError:'Staff Added Successfully'}, departmentData:departmentData})
            }
              return response.render('staffs/addStaff',{errors:{opsError:'Something Went wrong while adding staff'}, departmentData:departmentData})

        }catch(error){

            console.log('[addStaffs Controller] error:',error);
            return response.render('staffs/index',{errors:{opsError:'Something Went wrong while adding staff'}})

        } 
    },

    searchStaff : async function(request,response){
        try {
            const departmentData = await getAllDepartments();
            const validationErrors = validationResult(request);
            // console.log('validationErrors >>>',validationErrors);
            if(!validationErrors.isEmpty()){
                return response.render('staffs/index',{
                    errors : validationErrors.mapped()})
            }
            const staffId = request.body.staff_id;
            const staffData = await staffsmodels.getStaffById(staffId)
         if(!staffData){
            return response.render('staffs/index',{
                errors : {no_Data:'Staff data does not exists'}})

        }
        return response.render('staffs/searchstaff',{data: staffData, errors:{}, departmentData:departmentData})
    }
        catch (error) {
            console.log('[searchStaff Controller] error:',error);
            return response.render('staffs/index',{errors:{opsError:'Something Went wrong while searching staff'}})            
        }
    },

    updateStaff : async function(request,response){
        try {
            const departmentData = await getAllDepartments();
            const id = request.body.id;
            const staffData = await staffsmodels.getStaffById(id);
            const validationErrors = validationResult(request);
            // console.log('validationErrors >>>',validationErrors);
            if(!validationErrors.isEmpty()){
                return response.render('staffs/searchstaff',{
                    errors : validationErrors.mapped(),
                    data : staffData,
                    departmentData:departmentData
                })
            }

            const name = request.body.name;
            const subject = request.body.subject;
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
        const updatedresult = await staffsmodels.updateStaffById(data,id);
        if(!updatedresult === constants.resultFlag.error){
            return response.render('staffs/searchstaff',{
                errors : {updateError: 'unable to update data'},
                data : staffData,
                departmentData:departmentData
            })
        }
        const updatedstaffData = await staffsmodels.getStaffById(id);        
        return response.render('staffs/searchstaff',{
            errors : {successmsg : 'Data updated successfully'},
            data : updatedstaffData,
            departmentData:departmentData
        })

        } catch (error) {
            console.log('[updateStaff Controller] error:',error);
            return response.render('staffs/index',{errors:{opsError:'Something Went wrong while updating staff'}})            
        }
    },
    deleteStaff : async function(request,response){
        try {
            const staffId = request.params.staff_id;
            const result = await staffsmodels.deleteStaffById(staffId);
            if(result === constants.resultFlag.error){
                return response.render('staffs/index',{errors:{opsError:'Something Went wrong while deleting staff'}})
            }
            return response.render('staffs/index',{errors:{opsError:'Staff Deleted Successfully'}})
        } catch (error) {
            console.log('[deleteStaff Controller] error:',error);
            return response.render('staffs/index',{errors:{opsError:'Something Went wrong while deleting staff'}})
        }
    },
    getStaffsDetails : async function(request,response){
        try {
            const data = await staffsmodels.getStaffs();
            return response.render('staffs/details-page',{data:data});
        } catch (error) {
            console.log('[getStaffsDetails Controller] error:',error);
            return response.render('staffs/index',{errors:{opsError:'Something Went wrong while fetching staffs data'}});
            
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