const Validator = require ("fastest-validator")
const v = new Validator()

const schema = {
    email : {
        type : 'email',
        messages : {
            required: 'ایمیل ضروریه. ایمیل رو ارسال نکردی',
            emailEmpty : 'ایمیل خالیه. ایمیل رو وارد کن',
            email : 'ایمیل وارد شده معتبر نیست'
        }

    },
    password : {
        type : 'string',
        min : 8,
        max : 20,
        messages : {
            required : 'پسورد ضروریه. پسورد را وارد نکردی!',
            stringMin : 'پسورد باید حداقل 8 کارکتر باشه',
            stringMax : 'پسورد باید حداکثر 20 کارکتر باشه'
        }
    }
}

const validate = v.compile(schema)

const validateAndSanitize = (data) => {
    const result = validate(data)
    if(result !== true){
        const sanitizedErrors = result.map((error) => { 
            const { expected , actual , type , ...rest} = error
            return rest
    })
    return sanitizedErrors
    }else{
        return true
    }

}
module.exports = validateAndSanitize