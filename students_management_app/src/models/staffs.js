const consraints = require('../config/consraints');
const db=require('../coonector/database');


module.exports={
   getStaffs:function(){
        return new Promise((resolve,reject)=>{
            const sql = `SELECT * FROM STAFFS WHERE STATUS=${consraints.status.active}`
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
    getStaffsById:function(id){
        return new Promise((resolve,reject)=>{
            const sql = `SELECT * FROM STAFFS WHERE ID=? AND STATUS=${consraints.status.active}`
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
    
    insertStaffs:function(data){
        return new Promise((resolve,reject)=>{
        const sql =`INSERT INTO STAFFS (NAME, SUBJECT, DEPARTMENT,MOBILE_NO,STATUS)
        VALUES(?,?,?,?,?);`
        
        db.appDatabase.run(
            sql,
            [data.NAME,data.STREAM,data.DEPARTMENT,data.DOB,data.BATCH,data.MOBILE_NO,data.STATUS],
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
    updateStaffsById:function(data,id){
        return new Promise((resolve,reject)=>{
            const sql= 'UPDATE STAFFS SET NAME=?,SUBJECT=?,DEPARTMENT=?,MOBILE_NO=?,EMAIL=?,STATUS=? WHERE ID=?';
            db.appDatabase.run(
                sql,
                [data.NAME,data.STREAM,data.DEPARTMENT,data.BATCH,data.MOBILE_NO,data.EMAIL,data.STATUS,id],
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
    deleteStaffsById:function(id){
        return new Promise((resolve,reject)=>{
            const sql= `DELETE FROM STAFFS WHERE ID=? AND STATUS=${consraints.status.active}`
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