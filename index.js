const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const session = require('express-session')
const bodyParser = require('body-parser')
const User = require('./models/user')
const posts = require('./routes/posts')
const private = require('./routes/private')
const auth = require('./routes/auth')
const pages = require('./routes/pages')

const mongo = process.env.MONGODB || 'mongodb://localhost/auth-passport-mongoose'

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
/**
 * #TODO: whats is the difference between set and use on express?
 */
app.use(session({ secret: 'auth-passport-mongoose', saveUninitialized: true, resave: false }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

/**
 * All reqs be through here
 */

app.use((req, res, next) => {
  if ('user' in req.session) {
    res.locals.user = req.session.user
  }
  next()
})

app.use('/posts', posts)
/**
 * Middleware thats check if user is logged in
 */
app.use('/private', (req, res, next) => {
  if ('user' in req.session) {
    return next()
  }
  res.redirect('/login')
})

app.use('/private', private)
app.use('/', auth)
app.use('/', pages)
/**
 * countDocuments to count how many documents it is on db
 * check if has at least one user
 */
const createUserZero = async () => {
  const total = await User.countDocuments({ username: 'raloliver' })
  if (total === 0) {
    const user = new User({
      username: 'raloliver',
      password: '123456!Qw'
    })
    await user.save()
    console.log('User zero created!')
  } else {
    console.log('User zero already exists')
  }
}

/**
 * #TODO: how to use promise with mongoose?
 */
mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    createUserZero()
    app.listen(port, () => console.log(`listening server on port ${port}`))
  })
  .catch(err => console.log(err))




