const express = require('express')
const router = express.Router()

/**
 * #TODO: whats is render method?
 */
router.get('/', (req, res) => res.render('index'))

module.exports = router