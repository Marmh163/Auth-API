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
        pattern : /^(?=.[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        messages : {
            stringMin : 'پسورد باید حداقل 8 کارکتر باشه',
            stringPattern : 'پسورد باید شامل یک حرف کوچک. یک حرف بزرگ و یک عدد و یک کارکتر خاص باشد'
        }

    },
    role : {
        type : 'enum',
        values : ['user' , 'admin'],
        messages : {
            required : 'نقش کاربر مشخص نیست',
            enumValue : 'نقش کاربر باید یا  user یا admin باشه'
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