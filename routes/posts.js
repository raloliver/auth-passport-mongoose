const express = require('express')
const router = express.Router()
const Post = ('../models/post')

router.get('/', (req, res) => {
    res.send('public posts')
})

module.exports = router