module.exports={
    getMainPage:function(request,response){
        return response.render('index')
    },
    healthCheck : function(request,response){
        return response.status(200).send('server is up and running...')
    }
} 