const express = require('express')
const router = express.Router()

const Post = require('../models/post')

router.get('/', async (req, res) => {
    let access = {}
    if (!('user' in req.session)) {
        access = { status: 'public' }
    }
    const posts = await Post.find(access)
    res.render('posts/index', { posts })
})

module.exports = router