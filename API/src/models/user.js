const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Schemas
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password must not contain "password" word')
            }
        }
    },
    age: {
        type: Number,
        default: 13,
        validate(value) {
            if (value < 10) {
                throw new Error('age must be greater than 10')
            }
        }
    },
    phone: {
        type: Number,
        unique: true,
        required: true,
        maxlength: 12

    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

userSchema.virtual('requests', {
    ref: 'Requests',
    localField: '_id',
    foreignField: 'reqBy'
})

// ( instance method ) std function bcz of binding
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

// Don't send pass and tokens after login
//* toJSON method is called by express when ver obj is sent to client 
userSchema.methods.toJSON = function () {
    const user = this
    const userObj = user.toObject()

    delete userObj.password
    delete userObj.tokens
    //delete userObj.avatar
    console.log('From toJSON');

    return userObj
}

// own static method / model method 
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login from mail')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// hashing password before save
userSchema.pre('save', async function (next) {
    //this gives access to individual user
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// Delete user tasks when user removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User