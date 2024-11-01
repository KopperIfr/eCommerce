// --- User.js --- //

const mongoose = require('mongoose');
const validation = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: [3, 'Username must contain at least 3 characters!'],
        required: [true, 'Username required!'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email required!'],
        validate: {
            validator: validation.isEmail,
            message: 'Provide a valid email address!'
        }
    },
    password: {
        type: String,
        required: [true, 'Password required!'],
        validate: {
            validator: (v) => {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
            },
            message: "Password not strong enough!"
        }
    }
}, { timestamps: true });



UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    console.log(this.password);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.password);
    next();
});


UserSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;