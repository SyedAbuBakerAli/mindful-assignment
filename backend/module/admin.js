const mongoose = require(`mongoose`);
const validator = require(`validator`);
const bcrypt = require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true,
        maxLength: [30, `User name cannot exceed 30 characters`]
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, `Please enter correct email`]
        },
        password: {
            type: String,
            required: [true, 'Please enter your Password'],
            maxLength: [20, `Password cannot exceed 20 characters`],
            select:  false
        },
    phone: {
        type: Number,
        required: [false, 'Please enter your Phone Number'],
        unique: true,
        maxLength: [10, `Phone Number cannot exceed 10 characters`]
    },
    gender: {
        type: String,
        required: [false, `Please select your gender`],
        trim: true,
        maxLength: [8, `User name cannot exceed 30 characters`]
    },
    getToKnow:{
        type: String,
        required: [false, 'Please enter your gettoKnow'],
        trim: true,
        maxLength: [30, `User name cannot exceed 30 characters`]
    },
    city: {
        type: String,
        required: [false, `Please select your city`],
        trim: true,
        maxLength: [10, `User name cannot exceed 30 characters`]
    },
    state: {
        type: String,
        required: [false, `Please select your state`],
        trim: true,
        maxLength: [10, `User name cannot exceed 30 characters`]
    },
    role: {
        type: String,
        default: 'admin'
    }

})

//Encrypting password before saving admin

adminSchema.pre(`save`,async function(next){
    if(!this.isModified(`password`)){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// Return JWT token
adminSchema.methods.getJwtToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

//Compare user password
adminSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model(`Admin`, adminSchema);