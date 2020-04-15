const express = require('express')
const router = express.Router()

const Post = require('../models/post')

/**
 * Middleware thats check if user is logged in
 */
router.use((req, res, next) => {
    if ('user' in req.session) {
        if (req.session.user.roles.indexOf('master') >= 0) {
            return next()
        } else {
            res.redirect('/')
        }

    }
    res.redirect('/login')
})

router.get('/', (req, res) => {
    res.send('control')
})

router.get('/posts', async (req, res) => {
    const posts = await Post.find({})
    res.render('posts/control', { posts })
})

module.exports = router