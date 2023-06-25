const sqlite=require('sqlite3').verbose();
const path=require('path');

const dbpath=path.resolve(__dirname,'../../','app.sqlite');

const appDatabase = new sqlite.Database(
    dbpath,
    sqlite.OPEN_READWRITE,
    err=>{
        if(err){
            return console.log('error connecting to the database::', err);
        }
        console.log('app connected to the database');
    }
);
module.exports={appDatabase}

// appDatabase.get('SELECT DATETIME()',[],(err,row)=>{console.log(row)})