const express = require('express')
const router = express.Router()

const Post = require('../models/post')

/**
 * Middleware thats check if user is logged in
 */
router.use((req, res, next) => {
    if ('user' in req.session) {
        if (req.session.user.roles.indexOf('private') >= 0) {
            return next()
        } else {
            res.redirect('/')
        }
    }
    res.redirect('/login')
})

router.get('/', (req, res) => {
    res.send('OPS! You dont have access.')
})

router.get('/posts', async (req, res) => {
    const posts = await Post.find({ status: 'private' })
    res.render('posts/private', { posts })
})

module.exports = router