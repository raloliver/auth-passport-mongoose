const express = require('express')

const router = express.Router()

const Post = require('../models/post')
router.get('/', (req, res) => {
    res.send('OPS! You dont have access.')
})

router.get('/posts', async (req, res) => {
    const posts = await Post.find({ status: 'private' })
    res.render('posts/private', { posts })
})

module.exports = router