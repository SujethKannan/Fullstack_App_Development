const db = require('../connector/database');

const dbObjects = [ `DROP TABLE STUDENTS;`,`DROP TABLE STUDENTS_DETAILS;`,`DROP TABLE STAFFS;`];

dbObjects.forEach(obj=>{
    db.appDatabase.run(
        obj,
        [],
        (err,result)=>{
            if(err){
                console.log('something went wrong while undoing DB objects',err);
                process.exit(1)
            }
            console.log('DB Objects Dropped Successfully')
        }
    )
})