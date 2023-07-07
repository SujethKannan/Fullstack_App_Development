const models= require('../models/settings');

module.exports={
    getIndex : function(request,response){
        return response.render('settings/index')
    }
}