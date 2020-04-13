const express= require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('OPS! You dont have access.')
})

router.get('/posts', (req, res) => {
    res.send('private posts')
})

module.exports = router