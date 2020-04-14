const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.get('/login', (req, res) => res.render('login'))
router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    const password = await user ? user.checkPassword(req.body.password) : false
    const isValid = await password ? true : false
    if (isValid) {
        req.session.user = user
        res.redirect('/posts')
    } else {
        res.redirect('/login')
    }
})

module.exports = router