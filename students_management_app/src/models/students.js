const constants = require('../config/constants');
const db=require('../connector/database');


module.exports={
   getStudents:function(){
        return new Promise((resolve,reject)=>{
            const sql = `SELECT * FROM STUDENTS WHERE STATUS=${constants.status.active}`
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
            const sql = `SELECT S.ID,
            S.NAME,
            S.STREAM,
            S.DEPARTMENT,
            S.BATCH,
            S.DOB,
            S.MOBILE_NO,
            S.EMAIL,
            S.STATUS,
            S.CREATED_ON,
            S.MODIFIED_ON,
            SD.AGE,
            SD.ADDRESS,
            SD.BLOOD_GROUP 
            FROM STUDENTS S, STUDENTS_DETAILS SD WHERE S.ID=? AND S.STATUS=${constants.status.active} AND SD.STUDENT_ID=S.ID`
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
    
    insertStudent:function(data){
        return new Promise((resolve,reject)=>{
        const sql =`INSERT INTO STUDENTS (NAME, STREAM, DEPARTMENT, BATCH, DOB, MOBILE_NO)
        VALUES(?,?,?,?,?,?)`;
        
        db.appDatabase.run(
            sql,
            [data.name,data.stream,data.department,data.batch,data.dob,data.mobile_no],
            (err,result)=>{
                if(err){
                    console.log('[insertStudent Model]:unable to insert data',err);
                    return reject('error')
                }
                db.appDatabase.get(
                    'SELECT MAX(ID) AS ID FROM STUDENTS',
                    [],
                    (err,result)=>{
                        if(err){
                            console.log('[insertStudent Model]:unable to insert data',err);
                             return reject({msg:'error',result:null})
                            }
                            return resolve({msg:'success',result:result})
                        }
                )
            }
        )
    })
    },
    updateStudentsById:function(data,id){
        return new Promise((resolve,reject)=>{
            const sql= `UPDATE STUDENTS SET NAME=?,STREAM=?,DEPARTMENT=?,BATCH=?,DOB=?,MOBILE_NO=?,EMAIL=? WHERE ID=? AND STATUS=${constants.status.active}`;
            db.appDatabase.run(
                sql,
                [data.name,data.stream,data.department,data.batch,data.dob,data.mobile_no,data.email,id],
                (err,result)=>{
                    if(err){
                        console.log('[updateStudentsByIdModel]:unable to update data',err);
                         return reject('error')
                    }
                    return resolve('success')
                }
            )
        })
    },
    deleteStudentsById:function(id){
        return new Promise((resolve,reject)=>{
            const sql= `UPDATE STUDENTS 
            SET STATUS=${constants.status.inactive}
            WHERE ID =?
            AND STATUS=${constants.status.active}`
            db.appDatabase.run(
                sql,
                [id],
                (err,result)=>{
                    if(err){
                        console.log('[deleteStudentsByIdModel]:unable to delete data',err);
                         return reject('error')
                    }
                    return resolve('success')
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
            [data.student_id,data.age,data.address,data.blood_group],
            (err,result)=>{
                if(err){
                    console.log('[insertStudentsDtlsModel]:unable to insert data',err);
                    return reject('error')
                    }
                return resolve('success')
            }
        )
    })
    },
    updateStudentsDtlsById:function(data,Student_Id){
        return new Promise((resolve,reject)=>{
            const sql= `UPDATE STUDENTS_DETAILS
            SET  AGE=?, ADDRESS=?, BLOOD_GROUP=?
            WHERE ID=?`;
            
            db.appDatabase.run(
                sql,
                [data.age,data.address,data.blood_group,Student_Id],
                (err,result)=>{
                    if(err){
                        console.log('[updateStudentsDtlsById Model]:unable to update data',err);
                        return reject('error')                
                    }
                    return resolve('success')
                }
            )
        })
    },
    getStudentsdata:function(){
        return new Promise((resolve,reject)=>{
            const sql = `SELECT * FROM STUDENTS_DETAILS_RELATION_V`;
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
