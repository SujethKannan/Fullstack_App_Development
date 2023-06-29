const constants = require('../config/constatnts');
const db=require('../connector/database');


module.exports={
   getStaffs:function(){
        return new Promise((resolve,reject)=>{
            const sql = `SELECT * FROM STAFFS WHERE STATUS=${constants.status.active}`
            db.appDatabase.all(
                sql,
                [],
                (err,rows)=>{
                    if(err){
                        console.log('[getStaffs Model] error: something went wrong',err);
                        return reject('error')
                    }
                    return resolve(rows)
                }
            )
        })
    },
    getStaffById:function(id){
        return new Promise((resolve,reject)=>{
            const sql = `SELECT * FROM STAFFS WHERE ID=? AND STATUS=${constants.status.active}`
            db.appDatabase.get(
                sql,
                [id],
                (err,row)=>{
                    if(err){                        
                        console.log('[getStaffsByID Model] error: something went wrong',err);
                        return reject('error')
                    }
                    return resolve(row)
                }
            )
    
        })
    },
    
    insertStaff:function(data){
        return new Promise((resolve,reject)=>{
        const sql =`INSERT INTO STAFFS (NAME, SUBJECT, DEPARTMENT,MOBILE_NO)
        VALUES(?,?,?,?)`;
        
        db.appDatabase.run(
            sql,
            [data.name,data.subject,data.department,data.mobile_no],
            (err,result)=>{
                if(err){
                    console.log('[insertStaffs Model]:unable to insert data',err);
                    return reject('error')
                }
                resolve('success')
            }
        )
    })
    },
    updateStaffById:function(data,id){
        return new Promise((resolve,reject)=>{
            const sql= 'UPDATE STAFFS SET NAME=?,SUBJECT=?,DEPARTMENT=?,MOBILE_NO=?,EMAIL=? WHERE ID=? AND STATUS=${constants.status.active}';
            db.appDatabase.run(
                sql,
                [data.name,data.subject,data.department,data.mobile_no,data.email,id],
                (err,result)=>{
                    if(err){
                        console.log('[updateStaffsByIdModel]:unable to update data',err);
                         return reject('error')
                    }
                    resolve('success')
                }
            )
        })
    },
    deleteStaffById:function(id){
        return new Promise((resolve,reject)=>{
            const sql= `UPDATE STAFFS 
            SET STATUS=${constants.status.inactive}
            WHERE ID =?
            AND STATUS=${constants.status.active}`
            db.appDatabase.run(
                sql,
                [id],
                (err,result)=>{
                    if(err){
                        console.log('[deleteStaffsByIdModel]:unable to delete data',err);
                         return reject('error')
                    }
                    resolve('success')
                }
            )
        })
    }
}