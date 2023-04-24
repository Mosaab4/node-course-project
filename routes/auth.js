const express = require('express')
const {check, body} = require('express-validator')

const router = express.Router()

const authController = require('../controllers/auth')
const User = require('../models/user')

router.get('/login', authController.getLogin)

router.post(
    '/login',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email address.')
            .normalizeEmail(),
        body('password', 'Password has to be valid.')
            .isLength({min: 5})
            .isAlphanumeric()
            .trim()
    ],
    authController.postLogin
)

router.post('/logout', authController.postLogout)

router.get('/signup', authController.getSignUp)

router.post(
    '/signup',
    [
        check('email')
            .isEmail()
            .withMessage('Please Enter a valid email')
            .normalizeEmail()
            .custom((value, {req}) => {
                // if (value === 'test@test.com') {
                //     throw new Error('This email address is forbidden')
                // }
                //
                // return true

                return User.findOne({email: value})
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject('E-mail exists already')
                        }
                    })
            }),
        body('password', 'Please enter a password with only numbers and text and at least 5 characters')
            .isLength({min: 5})
            .isAlphanumeric()
            .trim(),
        body('confirmPassword')
            .trim()
            .custom((value, {req}) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords have to match')
                }

                return true
            })
    ],
    authController.postSignUp
)

module.exports = router