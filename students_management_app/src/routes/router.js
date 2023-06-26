const Router = require('express').Router();

Router.get('/health-check',(request,response)=>{
    response.status(200).send('server is up and running...')
})

module.exports=Router