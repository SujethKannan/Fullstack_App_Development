const db = require('../connector/database');

const dbObjects = [
    `CREATE TABLE IF NOT EXISTS STREAM (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        NAME TEXT NOT NULL,
        STATUS INTEGER CHECK( STATUS IN (0,1)) NOT NULL DEFAULT 1
    );`,
    `CREATE TABLE IF NOT EXISTS DEPARTMENT(
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        NAME TEXT NOT NULL,
        STATUS INTEGER CHECK( STATUS IN (0,1)) NOT NULL DEFAULT 1
    );`
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