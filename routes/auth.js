const express = require('express')
const router = express.Router()

const User = require('../models/user')

/**
 * All reqs be through here
 */

router.use((req, res, next) => {
    if ('user' in req.session) {
        res.locals.user = req.session.user
    }
    next()
})

router.get('/login', (req, res) => res.render('login'))
router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    const password = await user ? user.checkPassword(req.body.password) : false
    const isValid = await password ? true : false
    if (isValid) {
        req.session.user = user
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