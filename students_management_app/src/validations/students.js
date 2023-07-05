const {check} = require ('express-validator');

module.exports = { 
    addStudent : [
        check('name').isLength({min : 1}).withMessage('*Name is Mandatory'),
        check('stream').isLength({min : 1}).withMessage('*Stream is Mandatory'),
        check('department').isLength({min : 1}).withMessage('*Department is Mandatory'),
        check('batch').isLength({min : 1}).withMessage('*Batch is Mandatory'),
        check('dob').isLength({min : 1}).withMessage('*Date Of Birth is Mandatory'),
        check('mobile_no').isLength({min : 10,max : 10}).withMessage('*Mobile Number Should Be of 10 Digit Number'),
        check('mobile_no').isNumeric().withMessage('*Mobile Number Should be of 10 Digit Number'),
        check('blood_group').isLength({min : 1}).withMessage('*Blood_group is Mandatory')
    ],
    searchStudent:[
        check('student_id').isLength({min : 1}).withMessage('*student_id is Mandatory'),
        check('student_id').isNumeric().withMessage('*student_id Should be a Number')
    
    ],
    updateStudent:[
        check('name').isLength({min : 1}).withMessage('*Name is Mandatory'),
        check('stream').isLength({min : 1}).withMessage('*Stream is Mandatory'),
        check('department').isLength({min : 1}).withMessage('*Department is Mandatory'),
        check('batch').isLength({min : 1}).withMessage('*Batch is Mandatory'),
        check('dob').isLength({min : 1}).withMessage('*Date Of Birth is Mandatory'),
        check('mobile_no').isLength({min : 10,max : 10}).withMessage('*Mobile Number Should Be of 10 Digit Number'),
        check('mobile_no').isNumeric().withMessage('*Mobile Number Should be of 10 Digit Number'),
        check ('email').isLength({min : 1}).withMessage('*Mail_id is Mandatory')
    ]
}