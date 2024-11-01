const User = require('../../models/User.js');
const jwt = require('jsonwebtoken');

const Controller = {
    signUp: async (req, res) => {

        const {username, email, password, rpwd} = req.body;
        if(password !== rpwd) return res.json({message: 'Passwords must match!'});

        try {

            await User.create({
                username: username,
                email: email,
                password: password
            });

            return res.status(200).json({
                message: 'User signed up successfully!',
                errors: false
            });

        } catch (error) {

            if(error.name === 'ValidationError') {
                const errorMessages = Object.values(error.errors).map(err => err.message);
                return res.json({
                    message: 'Validation Failed!',
                    errors: errorMessages
                })
            }

            if(error.code === 11000) {
                return res.json({
                    message: 'Username already exists!'
                })
            }
            console.log(error);
            return res.json({
                message: 'Internal Error when creating a new User',
                error
            })
        }
    },
    signIn: async (req, res) => {
        const { username, password } = req.body;
        const user = await User.findOne({username});
        if(!user || !user.comparePassword(password)) {
            return res.json({
                message: 'Invalid credentials!'
            })
        }

        const authToken = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        res.cookie('authToken', authToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        req.session.user = {
            _id: user._id,
            username: user.username,
            email: user.email
        }
        res.json({
            message: 'User logged in successfully!'
        })
    },
    signOut: async (req, res) => {
        try {
            req.session.destroy();
            res.clearCookie('authToken');
            res.json({
                message: 'User signed out!'
            })
        } catch (error) {
            console.log('Error when sigin out',error);
            res.json({
                error: error
            })
        }
    },
}

module.exports = Controller;