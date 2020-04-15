const express = require('express')
const router = express.Router()

const User = require('../models/user')

/**
 * All reqs be through here
 */

router.use((req, res, next) => {
    if ('user' in req.session) {
        res.locals.user = req.session.user
        res.locals.role = req.session.role
    }
    next()
});

router.get('/profile/:profile', (req, res) => {
    if ('user' in req.session) {
        if (req.session.user.roles.indexOf(req.params.profile) >= 0) {
            req.session.role = req.params.profile
        }
    }
    res.redirect('/')
})


router.get('/login', (req, res) => res.render('login'))
router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    // maybe you can check if user exists
    const password = await user ? user.checkPassword(req.body.password) : false
    const isValid = await password ? true : false
    if (isValid) {
        req.session.user = user
        req.session.role = user.roles[0]
        res.redirect('/private/posts')
    } else {
        res.redirect('/login')
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
})


module.exports = router