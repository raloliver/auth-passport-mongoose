const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const session = require('express-session')
const User = require('./models/user')
const posts = require('./routes/posts')
const private = require('./routes/private')

const mongo = process.env.MONGODB || 'mongodb://localhost/auth-passport-mongoose'

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
/**
 * #TODO: whats is the difference between set and use on express?
 */
app.use(session({ secret: 'auth-passport-mongoose' }))

app.use(express.static('public'))
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

app.get('/login', (req, res) => res.render('login'))

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
 * #TODO: whats is render method?
 */
app.get('/', (req, res) => res.render('index'))

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




