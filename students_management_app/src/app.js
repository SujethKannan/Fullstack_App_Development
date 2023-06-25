const express = require('express');
const bodyparser = require('body-parser');    // to parse input data from HTML file
const path = require('path');

const app = express();
const HOSTNAME ='localhost';
const PORT =8000;

app.set('view engine','ejs')                  // reading template(render in HTML)
app.set('views',path.resolve(__dirname,'views'))

app.get('/check',(request,response)=>{
    response.send('Server is up and running')
});

app.get('/home',(request,response)=>{
    response.render('index')
});

app.listen(PORT,()=>{
    console.log(`Server is Running > http://${HOSTNAME}:${PORT}/`);
})