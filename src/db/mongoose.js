const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
})

// const User = mongoose.model('User',{
//     name:{
//         type: String,
//         required: true,
//         trim: true
//     },
//     age: {
//         type: Number,
//         default:0,
//         validate(value){
//             if(value <0){
//                 throw new Error('Age must be a positive numer')
//             }
//         }
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value){
//             if (!validator.isEmail(value)){
//                 throw new Error ('Email is invalid')
//             }
//         }
//     },
//     password: {
//         type: String,
//         require: true,
//         minlength:7,
//         trim: true,
//         validate(value)
//         {
//             if (value.toLowerCase().includes('password')){
//                 throw new Error ('Password can not be Password')
//             }
//         }
//     } 
// })

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed_field:{
        type: Boolean,
        default: false
    }
})


// const me = new User({
//     name: '   Harold    Alejandro',
//     email: 'HaroldBarron13@gmail.com',
//     password:'5'
// })


// me.save().then(() => {
//     console.log(me)
// }).catch((error) =>{
//     console.log('ERROR!', error)
// })

const taskOne = new Task({
    description: "Add validations"
})

taskOne.save().then(()=>{
    console.log(taskOne)
}).catch((error) =>{
    console.log(error)
})