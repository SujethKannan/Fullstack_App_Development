const db = require('../connector/database');

const dbObjects = [ 
    `CREATE TABLE IF NOT EXISTS STUDENTS(
        ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
        NAME TEXT NOT NULL,
        STREAM TEXT NOT NULL,
        DEPARTMENT TEXT NOT NULL,
        BATCH TEXT NOT NULL,
        DOB TEXT NOT NULL,
        MOBILE_NO TEXT NO NULL UNIQUE,
        EMAIL TEXT NOT NULL DEFAULT 'MAIL_ID',
        STATUS INTEGER CHECK(STATUS IN (0,1)) NOT NULL DEFAULT 1,
        CREATED_ON TEXT NOT NULL DEFAULT 'D&T',
        MODIFIED_ON TEXT NOT NULL DEFAULT 'D&T'
        );`,
    `CREATE TABLE IF NOT EXISTS STUDENTS_DETAILS(
        ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        STUDENT_ID INTEGER NOT NULL,
        AGE INTEGER NOT NULL,
        ADDRESS TEXT NOT NULL,
        BLOOD_GROUP TEXT NOT NULL,
        FOREIGN KEY (STUDENT_ID) REFERENCES STUDENTS(ID)
        );`,
    `CREATE TABLE IF NOT EXISTS STAFFS(
        ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        NAME TEXT NOT NULL,
        SUBJECT TEXT NOT NULL,
        DEPARTMENT TEXT NOT NULL,
        MOBILE_NO TEXT NO NULL UNIQUE,
        EMAIL TEXT NOT NULL DEFAULT 'MAIL_ID',
        STATUS INTEGER CHECK(STATUS IN (0,1)) NOT NULL DEFAULT 1,
        CREATED_ON TEXT NOT NULL DEFAULT 'D&T',
        MODIFIED_ON TEXT NOT NULL DEFAULT 'D&T'
        );`

]

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