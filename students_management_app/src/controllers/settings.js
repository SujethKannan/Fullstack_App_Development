const models = require('../models/settings');
const constants = require('../config/constants');
const {validationResult} = require('express-validator')

module.exports={
    getIndex : async function(request,response){
        const departmentData = await getAllDepartments();
        const streamData = await getAllStreams();
        return response.render('settings/index',{message:{} , departmentData:departmentData , streamData:streamData})
    },
    addDepartment : async function(request,response){
            const departmentData = await getAllDepartments();
            const streamData = await getAllStreams();
        try {
            const departmentData = await getAllDepartments();
            const streamData = await getAllStreams();
            const errors = validationResult(request);
            if(!errors.isEmpty()){
                return response.render('settings/index',{ message:errors.mapped(), departmentData:departmentData , streamData:streamData})  
            }
            let name = request.body.department;
            name = String(name).trim();   // to remove leading and trialing space 
            const result = await models.addDepartment(name)
            if(result === constants.resultFlag.error){
                return response.render('settings/index',{message : {errDept : 'unable to add department'} , departmentData:departmentData , streamData:streamData});
            }
            return response.render('settings/index',{message : {succDept : 'Department Added successfully'} , departmentData:departmentData , streamData:streamData});
        } catch (error) {
            console.log("[addDepartment controller] error",error);
            return response.render('settings/index',{message : {errDept : 'unable to add department'} , departmentData:departmentData , streamData:streamData});
            
        }
    },
    deleteDepartment : async function(request,response){
            const departmentData = await getAllDepartments();
            const streamData = await getAllStreams();
        try {
            const errors = validationResult(request);
            if(!errors.isEmpty()){
                return response.render('settings/index',{ message:errors.mapped(), departmentData:departmentData , streamData:streamData})
            }    
            const id = request.body.deleteDepartment;
            const result = await models.deleteDepartment(id);
            if (result === constants.resultFlag.error){
            return response.render('settings/index',{message : {errDeleteDept : 'unable to delete department'} , departmentData:departmentData , streamData:streamData});
            } 
            return response.render('settings/index',{message : {succDeleteDept : 'Department deleted successfully'} , departmentData:departmentData , streamData:streamData});       
        } catch (error) {
            console.log("[deleteDepartment controller] error",error);
            return response.render('settings/index',{message : {errDeleteDept : 'unable to delete department'} , departmentData:departmentData , streamData:streamData});
        }
    },
    addStream : async function(request,response){
            const departmentData = await getAllDepartments();
            const streamData = await getAllStreams();
        try {
            const errors = validationResult(request);
            if(!errors.isEmpty()){
                return response.render('settings/index',{ message:errors.mapped(), departmentData:departmentData , streamData:streamData})
            }
            let name = request.body.stream;
            name = String(name).trim();    // to remove leading and trialing space 
            const result = await models.addStream(name)
            if(result === constants.resultFlag.error){
                return response.render('settings/index',{message : {errStream : 'unable to add stream'} ,departmentData:departmentData, streamData:streamData});
            }
            return response.render('settings/index',{message : {succStream : 'Stream Added successfully'} ,departmentData:departmentData,  streamData:streamData});
        } catch (error) {
            console.log("[addStream controller] error",error);
            return response.render('settings/index',{message : {errStream : 'unable to add stream'} ,departmentData:departmentData,  streamData:streamData});
            
        }
    },
    deleteStream : async function(request,response){
        const departmentData = await getAllDepartments();
        const streamData = await getAllStreams();
    try {
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.render('settings/index',{ message:errors.mapped(), departmentData:departmentData , streamData:streamData})
        }    
        const id = request.body.deleteStream;
        const result = await models.deleteStream(id);
        if (result === constants.resultFlag.error){
        return response.render('settings/index',{message : {errDeleteStream : 'unable to delete Stream'} , departmentData:departmentData , streamData:streamData});
        } 
        return response.render('settings/index',{message : {succDeleteStream : 'Stream deleted successfully'} , departmentData:departmentData , streamData:streamData});       
    } catch (error) {
        console.log("[deleteStream controller] error",error);
        return response.render('settings/index',{message : {errDeleteStream : 'unable to delete Stream'} , departmentData:departmentData , streamData:streamData});
    }
}
}

const getAllDepartments = async ()=>{
    try {
        return await models.getDepartment();
    } catch (error) {
        console.log('[getAllDepartments] error :',error);
        return null;        
    }
 }

 const getAllStreams = async ()=>{
    try {
        return await models.getStream();
    } catch (error) {
        console.log('[getAllStreams] error :',error);
        return null;        
    }
 }