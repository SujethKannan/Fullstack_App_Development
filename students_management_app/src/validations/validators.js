const {check} = require ('express-validator');

module.exports = { 
    addStudent : [
        check('name').isLength({min : 1}).withMessage('*Name is Mandatory'),
        check('stream').isLength({min : 1}).withMessage('*Stream is Mandatory'),
        check('department').isLength({min : 1}).withMessage('*Department is Mandatory'),
        check('batch').isLength({min : 1}).withMessage('*Batch is Mandatory'),
        check('dob').isLength({min : 1}).withMessage('*Dob is Mandatory'),
        check('mobile_no').isLength({min : 1}).withMessage('*Mobile_no is Mandatory'),
        check('mobile_no').isLength({max : 10}).withMessage('*Mobile_no should be of 10 digits'),
        check('mobile_no').isNumeric().withMessage('*Mobile_No Should be of 10 Digit Number')
    ],
    addStaff:[
        check('name').isLength({min : 1}).withMessage('*Name is Mandatory'),
        check('subject').isLength({min : 1}).withMessage('*Subject is Mandatory'),
        check('department').isLength({min : 1}).withMessage('*Department is Mandatory'),
        check('mobile_no').isLength({min : 1}).withMessage('*Mobile_no is Mandatory'),
        check('mobile_no').isLength({max : 10}).withMessage('*Mobile_no should be of 10 digits'),
        check('mobile_no').isNumeric().withMessage('*Mobile_No Should be of 10 Digit Number')
    ],
    searchStudent:[
        check('student_id').isLength({min : 1}).withMessage('*student_id is Mandatory'),
        check('student_id').isNumeric().withMessage('*student_id Should be a Number')
    
    ],
    searchStaff:[
        check('staff_id').isLength({min : 1}).withMessage('*staff_id is Mandatory'),
        check('staff_id').isNumeric().withMessage('*staff_id Should be a Number')
        
    ],
    updateStudent:[
        check('name').isLength({min : 1}).withMessage('*Name is Mandatory'),
        check('stream').isLength({min : 1}).withMessage('*Stream is Mandatory'),
        check('department').isLength({min : 1}).withMessage('*Department is Mandatory'),
        check('batch').isLength({min : 1}).withMessage('*Batch is Mandatory'),
        check('dob').isLength({min : 1}).withMessage('*Dob is Mandatory'),
        check('mobile_no').isLength({min : 1}).withMessage('*Mobile_no is Mandatory'),
        check('mobile_no').isLength({max : 10}).withMessage('*Mobile_no should be of 10 digits'),
        check('mobile_no').isNumeric().withMessage('*Mobile_No Should be of 10 Digit Number'),
        check ('email').isLength({min : 1}).withMessage('*Mail_id is Mandatory')

    ],
    updateStaff:[
        check('name').isLength({min : 1}).withMessage('*Name is Mandatory'),
        check('subject').isLength({min : 1}).withMessage('*Subject is Mandatory'),
        check('department').isLength({min : 1}).withMessage('*Department is Mandatory'),
        check('mobile_no').isLength({min : 1}).withMessage('*Mobile_no is Mandatory'),
        check('mobile_no').isLength({max : 10}).withMessage('*Mobile_no should be of 10 digits'),
        check('mobile_no').isNumeric().withMessage('*Mobile_No Should be of 10 Digit Number'),
        check ('email').isLength({min : 1}).withMessage('*Mail_id is Mandatory')

    ]
}