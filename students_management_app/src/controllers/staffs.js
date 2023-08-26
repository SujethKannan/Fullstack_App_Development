const staffsmodels= require('../models/staffs');
const settingsmodels= require('../models/settings');
const constants = require('../config/constants');
const {validationResult} = require('express-validator');
const fastcsv = require('fast-csv');
const moment = require ('moment');
const path = require('path');
const fs = require('fs');


module.exports={
    getIndex:function(request,response){
       return  response.render('staffs/index',{errors:{},fileName:null})
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
              return response.render('staffs/addStaff',{errors:{opsError1:'Something Went wrong while adding staff'}, departmentData:departmentData})

        }catch(error){

            console.log('[addStaffs Controller] error:',error);
            return response.render('staffs/index',{errors:{opsError1:'Something Went wrong while adding staff'},fileName:null})

        } 
    },

    searchStaff : async function(request,response){
        try {
            const departmentData = await getAllDepartments();
            const validationErrors = validationResult(request);
            // console.log('validationErrors >>>',validationErrors);
            if(!validationErrors.isEmpty()){
                return response.render('staffs/index',{
                    errors : validationErrors.mapped(),
                    fileName:null
                })
            }
            const staffId = request.body.staff_id;
            const staffData = await staffsmodels.getStaffById(staffId)
         if(!staffData){
            return response.render('staffs/index',{
                errors : {no_Data:'Staff data does not exists'},
                fileName:null
            })
        }
        return response.render('staffs/searchstaff',{data: staffData, errors:{}, departmentData:departmentData})
    }
        catch (error) {
            console.log('[searchStaff Controller] error:',error);
            return response.render('staffs/index',{errors:{opsError2:'Something Went wrong while searching staff'},fileName:null})            
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
            return response.render('staffs/index',{errors:{opsError3:'Something Went wrong while updating staff'},fileName:null})            
        }
    },
    deleteStaff : async function(request,response){
        try {
            const staffId = request.params.staff_id;
            const result = await staffsmodels.deleteStaffById(staffId);
            if(result === constants.resultFlag.error){
                return response.render('staffs/index',{errors:{opsError:'Something Went wrong while deleting staff'},fileName:null})
            }
            return response.render('staffs/index',{errors:{opsError4:'Staff Deleted Successfully'},fileName:null})
        } catch (error) {
            console.log('[deleteStaff Controller] error:',error);
            return response.render('staffs/index',{errors:{opsError5:'Something Went wrong while deleting staff'},fileName:null})
        }
    },
    getStaffsDetails : async function(request,response){
        try {
            const data = await staffsmodels.getStaffs();
            return response.render('staffs/details-page',{data:data});
        } catch (error) {
            console.log('[getStaffsDetails Controller] error:',error);
            return response.render('staffs/index',{errors:{opsError6:'Something Went wrong while fetching staffs data'},fileName:null});
            
        }
    },
    exportStaffsData : async function(request,response){
    try {
        const data = await staffsmodels.getStaffs();
        const exportDir = path.resolve(__dirname,'../','public/exports');
        const time = moment().utcOffset('+5:30').format('YYYYMMDDHHmmss');
        const fileName = 'StaffData_' + String(time) + '.csv';
        const endpath = exportDir + '/' + fileName;
        //console.log(data);
        const ws = fs.createWriteStream(endpath);
        fastcsv.write(
            data,
            {headers:true}
        ).on('finish',()=>{
            return response.render('staffs/index',{errors:{},fileName:fileName})
        }).pipe(ws)
    } catch (error) {
        return response.render('staffs/index',{errors:{exportError:'Something Went wrong while exporting staffs report'},fileName:null});
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