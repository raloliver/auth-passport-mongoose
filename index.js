const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const mongo = process.env.MONGODB || 'mongodb://localhost/auth-passport-mongoose'

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))
/**
 * #TODO: whats is render method?
 */
app.get('/', (req, res) => res.render('index'))

/**
 * #TODO: how to use promise with mongoose?
 */
mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => console.log(`listening server on port ${port}`))
  })
  .catch(err => console.log(err))
