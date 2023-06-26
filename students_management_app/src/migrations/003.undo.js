const db = require('../connector/database');


const dbObjects = [
    `DROP TRIGGER STUDENTS_CREATED_TRG;`,
    `DROP TRIGGER STUDENTS_MODIFIED_TRG;`,
    `DROP TRIGGER STUDENTS_EMAIL_TRG;`,
    `DROP TRIGGER STAFFS_CREATED_TRG;`,
    `DROP TRIGGER STAFFS_MODIFIED_TRG;`,
    `DROP TRIGGER STAFFS_EMAIL_TRG;`
];

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