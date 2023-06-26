const db = require('../connector/database');


const dbObjects = [
    `CREATE VIEW IF NOT EXISTS STUDENTS_DETAILS_RELATION_V
    AS
    SELECT s.ID AS STUDENT_ID,
    s.NAME,
    s.STREAM,
    s.DEPARTMENT,
    s.BATCH,
    s.DOB, 
    s.MOBILE_NO,
    s.EMAIL,
    sd.AGE,
    sd.ADDRESS,
    sd.BLOOD_GROUP,
    s.CREATED_ON ,
    s.MODIFIED_ON 
    FROM STUDENTS s,
    STUDENTS_DETAILS sd 
    ON s.ID=sd.STUDENT_ID 
    WHERE s.STATUS=1`
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