const mongoose = require('mongoose')
const validator = require('validator')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default:0,
        validate(value){
            if(value <0){
                throw new Error('Age must be a positive numer')
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error ('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        require: true,
        minlength:7,
        trim: true,
        validate(value)
        {
            if (value.toLowerCase().includes('password')){
                throw new Error ('Password can not be Password')
            }
        }
    },
    tokens: [{
        token:{
            type: String,
            require: true
        }
    }],
    avatar: {
        type: Buffer
    }
},{
    timestamps:true
})

userSchema.virtual('tasks',{
    ref: 'Task',
    localField:'_id',
    foreignField: 'owner'
})


userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

userSchema.methods.generateAuthToken = async function (){
        const user = this
        const token = jwt.sign({_id: user.id.toString()},process.env.JWT_SECRET)

        user.tokens = user.tokens.concat({token})
        await user.save()
        return token 
}

userSchema.statics.findByCredentials = async (email,password) =>{
    const user = await User.findOne({email})

    if (!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bycrypt.compare(password,user.password)

    if (!isMatch){
        throw new Error('unable to login')
    }

    return user
}



//Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this 

    if (user.isModified('password')){
        user.password = await bycrypt.hash(user.password,8)
    }
    next()
})

//Delete user task when user is remove
userSchema.pre('remove', async function(next) {
    const user = this
    await Task.deleteMany({owner: user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User