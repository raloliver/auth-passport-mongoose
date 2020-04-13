const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    status: String
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post