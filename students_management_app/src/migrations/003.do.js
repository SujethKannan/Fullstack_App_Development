const db = require('../connector/database');


const dbObjects = [
    `CREATE TRIGGER IF NOT EXISTS STUDENTS_CREATED_TRG          
    AFTER INSERT 
    ON STUDENTS 
    BEGIN 
        UPDATE STUDENTS
        SET CREATED_ON = DATETIME(),
        MODIFIED_ON = DATETIME()
        WHERE ID = new.ID;
    END;`,
    `CREATE TRIGGER IF NOT EXISTS STUDENTS_MODIFIED_TRG
    AFTER UPDATE 
    ON STUDENTS
    BEGIN 
        UPDATE STUDENTS
        SET MODIFIED_ON = DATETIME()
        WHERE ID = new.ID;
    END;`,
    `CREATE TRIGGER STUDENTS_EMAIL_TRG
    AFTER INSERT
    ON STUDENTS
    BEGIN
    UPDATE STUDENTS 
    SET EMAIL = LOWER(REPLACE(NAME,' ','.'))||'@collegestudent.com'
    WHERE ID= NEW.ID;
    END;`,
    `CREATE TRIGGER IF NOT EXISTS STAFFS_CREATED_TRG
    AFTER INSERT 
    ON STAFFS 
    BEGIN 
        UPDATE STAFFS
        SET CREATED_ON = DATETIME(),
        MODIFIED_ON = DATETIME()
        WHERE ID = new.ID;
    END;`,
    `CREATE TRIGGER IF NOT EXISTS STAFFS_MODIFIED_TRG
    AFTER UPDATE 
    ON STAFFS
    BEGIN 
        UPDATE STAFFS
        SET MODIFIED_ON = DATETIME()
        WHERE ID = new.ID;
    END;`,
    `CREATE TRIGGER STAFFS_EMAIL_TRG
    AFTER INSERT
    ON STAFFS
    BEGIN
    UPDATE STAFFS 
    SET EMAIL = LOWER(REPLACE(NAME,' ','.'))||'@collegefaculty.com'
    WHERE ID= NEW.ID;
    END;`
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