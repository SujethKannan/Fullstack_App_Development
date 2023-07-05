const {check} = require ('express-validator');

module.exports = { 
    addStaff:[
        check('name').isLength({min : 1}).withMessage('*Name is Mandatory'),
        check('subject').isLength({min : 1}).withMessage('*Subject is Mandatory'),
        check('department').isLength({min : 1}).withMessage('*Department is Mandatory'),
        check('mobile_no').isLength({min : 10,max : 10}).withMessage('*Mobile Number Should Be of 10 Digit Number'),
        check('mobile_no').isNumeric().withMessage('*Mobile Number Should be of 10 Digit Number')
    ],
    searchStaff:[
        check('staff_id').isLength({min : 1}).withMessage('*staff_id is Mandatory'),
        check('staff_id').isNumeric().withMessage('*staff_id Should be a Number')
        
    ],
    updateStaff:[
        check('name').isLength({min : 1}).withMessage('*Name is Mandatory'),
        check('subject').isLength({min : 1}).withMessage('*Subject is Mandatory'),
        check('department').isLength({min : 1}).withMessage('*Department is Mandatory'),
        check('mobile_no').isLength({min : 10,max : 10}).withMessage('*Mobile Number Should Be of 10 Digit Number'),
        check('mobile_no').isNumeric().withMessage('*Mobile Number Should be of 10 Digit Number'),
        check ('email').isLength({min : 1}).withMessage('*Mail_id is Mandatory')
    ]
}