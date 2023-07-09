const{check} = require('express-validator');

module.exports={
    addDepartment : [
        check('department').isLength({min:1,max:100}).withMessage('*Department is Mandatory')
    ],
    addStream : [
        check('stream').isLength({min:1,max:100}).withMessage('*Stream is Mandatory')
    ],
    deleteDepartment : [
        check('deleteDepartment').isLength({min:1,max:100}).withMessage('*Department is Mandatory')
    ],
    deleteStream : [
        check('deleteStream').isLength({min:1,max:100}).withMessage('*Stream is Mandatory')
    ]
}