const db = require('../connector/database');


const dbObjects = [`CREATE INDEX IDX_STUDENTS_ID ON STUDENTS(ID)`,`CREATE INDEX IDX_STAFFS_ID ON STAFFS(ID)`];

dbObjects.forEach(obj=>{
    db.appDatabase.run(
        obj,
        [],
        (err,result)=>{
            if(err){
                console.log('something went wrong while creating DB objects',err);
                process.exit(1)
            }
            console.log('DB Objects Created Successfully')
        }
    )
})