const express = require('express')
const router = express.Router()

const Post = require('../models/post')

router.get('/', async (req, res) => {
    const posts = await Post.find({})
    res.render('posts/index', { posts })
})

module.exports = router