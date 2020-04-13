const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('public posts')
})

module.exports = router