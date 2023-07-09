const constants = require('../config/constants');
const db=require('../connector/database');


module.exports={
   getDepartment:function(){
        return new Promise((resolve,reject)=>{
            const sql = `SELECT * FROM DEPARTMENT WHERE STATUS=${constants.status.active}`
            db.appDatabase.all(
                sql,
                [],
                (err,data)=>{
                    if(err){
                        console.log('[getDepartment Model] error: something went wrong',err);
                        return reject('error')
                    }
                    return resolve(data)
                }
            )
        })
    },
    addDepartment:function(name){
        return new Promise((resolve,reject)=>{
            const sql = `INSERT INTO DEPARTMENT (NAME) VALUES (?)`
            db.appDatabase.run(
                sql,
                [name],
                (err,data)=>{
                    if(err){
                        console.log('[addDepartment Model] error: something went wrong',err);
                        return reject('error')
                    }
                    return resolve('success')
                }
            )
        })
    },
    deleteDepartment:function(id){
        return new Promise((resolve,reject)=>{
            const sql = `UPDATE DEPARTMENT SET STATUS = ${constants.status.inactive} WHERE ID = ?`
            db.appDatabase.run(
                sql,
                [id],
                (err,data)=>{
                    if(err){
                        console.log('[deleteDepartment Model] error: something went wrong',err);
                        return reject('error')
                    }
                    return resolve('success')
                }
            )
        })
    },
    getStream:function(){
        return new Promise((resolve,reject)=>{
            const sql = `SELECT * FROM STREAM WHERE STATUS=${constants.status.active}`
            db.appDatabase.all(
                sql,
                [],
                (err,data)=>{
                    if(err){
                        console.log('[getStream Model] error: something went wrong',err);
                        return reject('error')
                    }
                    return resolve(data)
                }
            )
        })
    },
    addStream:function(name){
        return new Promise((resolve,reject)=>{
            const sql = `INSERT INTO STREAM (NAME) VALUES (?)`
            db.appDatabase.run(
                sql,
                [name],
                (err,data)=>{
                    if(err){
                        console.log('[addStream Model] error: something went wrong',err);
                        return reject('error')
                    }
                    return resolve('success')
                }
            )
        })
    },
    deleteStream:function(id){
        return new Promise((resolve,reject)=>{
            const sql = `UPDATE STREAM SET STATUS = ${constants.status.inactive} WHERE ID = ?`
            db.appDatabase.run(
                sql,
                [id],
                (err,data)=>{
                    if(err){
                        console.log('[deleteStream Model] error: something went wrong',err);
                        return reject('error')
                    }
                    return resolve('success')
                }
            )
        })
    }
}
