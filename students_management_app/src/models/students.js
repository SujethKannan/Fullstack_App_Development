const consraints = require('../config/consraints');
const db=require('../coonector/database');


module.exports={
   getStudents:function(){
        return new Promise((resolve,reject)=>{
            const sql = `SELECT * FROM STUDENTS WHERE STATUS=${consraints.status.active}`
            db.appDatabase.all(
                sql,
                [],
                (err,rows)=>{
                    if(err){
                        console.log('[getStudents Model] error: something went wrong',err);
                        return reject('error')
                    }
                    return resolve(rows)
                }
            )
        })
    },
    getStudentById:function(id){
        return new Promise((resolve,reject)=>{
            const sql = `SELECT * FROM STUDENTS WHERE ID=? AND STATUS=${consraints.status.active}`
            db.appDatabase.get(
                sql,
                [id],
                (err,row)=>{
                    if(err){                        
                        console.log('[getStudentByID Model] error: something went wrong',err);
                        return reject('error')
                    }
                    return resolve(row)
                }
            )
    
        })
    },
    
    insertStudents:function(data){
        return new Promise((resolve,reject)=>{
        const sql =`INSERT INTO STUDENTS (NAME, STREAM, DEPARTMENT, BATCH, DOB, MOBILE_NO,STATUS)
        VALUES(?,?,?,?,?,?,?);`
        
        db.appDatabase.run(
            sql,
            [data.NAME,data.STREAM,data.DEPARTMENT,data.DOB,data.BATCH,data.MOBILE_NO],
            (err,result)=>{
                if(err){
                    console.log('[insertStudent Model]:unable to insert data',err);
                    return reject('error')
                }
                resolve('success')
            }
        )
    })
    },
    updateStudentsById:function(data,id){
        return new Promise((resolve,reject)=>{
            const sql= 'UPDATE STUDENTS SET NAME=?,STREAM=?,DEPARTMENT=?,BATCH=?,MOBILE_NO=?,EMAIL=?,STATUS=? WHERE ID=?';
            db.appDatabase.run(
                sql,
                [data.NAME,data.STREAM,data.DEPARTMENT,data.BATCH,data.MOBILE_NO,data.EMAIL,data.STATUS,id],
                (err,result)=>{
                    if(err){
                        console.log('[updateStudentsByIdModel]:unable to update data',err);
                         return reject('error')
                    }
                    resolve('success')
                }
            )
        })
    },
    deleteStudentsById:function(id){
        return new Promise((resolve,reject)=>{
            const sql= `DELETE FROM STUDENTS WHERE ID=? AND STATUS=${consraints.status.active}`
            db.appDatabase.run(
                sql,
                [id],
                (err,result)=>{
                    if(err){
                        console.log('[deleteStudentsByIdModel]:unable to delete data',err);
                         return reject('error')
                    }
                    resolve('success')
                }
            )
        })
    },    
    insertStudentDetail:function(data){
        // console.log('----');
        return new Promise((resolve,reject)=>{
        const sql =`INSERT INTO STUDENTS_DETAILS(STUDENT_ID, AGE, ADDRESS, BLOOD_GROUP)
        VALUES(?,?,?,?)`
        db.appDatabase.run(
            sql,
            [data.STUDENTS_ID,data.AGE,data.ADDRESS,data.BLOOD_GROUP],
            (err,result)=>{
                if(err){
                    console.log('[insertStudentsDtlsModel]:unable to insert data',err);
                    return reject('error')
                    }
                resolve('success')
            }
        )
    })
    },
    updateStudentsDtlsById:function(data,Student_Id){
        return new Promise((resolve,reject)=>{
            const sql= `UPDATE STUDENTS_DETAILS
            SET STUDENT_ID=?, AGE=?, ADDRESS=?, BLOOD_GROUP=?
            WHERE ID=?;`
            
            db.appDatabase.run(
                sql,
                [data.AGE,data.ADDRESS,data.BLOOD_GROUP,id],
                (err,result)=>{
                    if(err){
                        console.log('[updateStudentsDtlsByIdModel]:unable to update data',err);
                        return reject('error')                
                    }
                    resolve('success')
                }
            )
        })
    },
    getStudentsdata:function(){
        return new Promise((resolve,reject)=>{
            const sql = `SELECT * FROM STUDENTS_DETAILS_RELATION_V;`
            db.appDatabase.all(
                sql,
                [],
                (err,rows)=>{
                    if(err){
                        console.log('[getStudentsdata Model] error: something went wrong',err);
                        return reject('error')
                    }
                    return resolve(rows)
                }
            )
        })
    }
}
