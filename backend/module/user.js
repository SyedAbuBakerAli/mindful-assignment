const mongoose = require(`mongoose`);
const validator = require(`validator`);

const userSchema = mongoose.Schema({

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
    phone: {
        type: Number,
        required: [true, 'Please enter your Phone Number'],
        unique: true,
        maxLength: [10, `Phone Number cannot exceed 10 characters`]
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: `Admin`
    }

})

module.exports = mongoose.model('User',userSchema)