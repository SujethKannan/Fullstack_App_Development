const db = require('../connector/database');


const dbObjects = [
    `CREATE VIEW IF NOT EXISTS STUDENTS_DTLS_RELATION_V
    AS
    SELECT ID AS STUDENT_ID,
    NAME,
    STREAM,
    DEPARTMENT,
    BATCH,
    DOB, 
    MOBILE_NO,
    EMAIL,
    AGE,
    ADDRESS,
    BLOOD_GROUP,
    STATUS,
    CREATED_ON ,
    MODIFIED_ON 
    FROM STUDENTS s,
    STUDENTS_DTLS sd 
    ON s.ID=sd.STUDENT_ID;`
];

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