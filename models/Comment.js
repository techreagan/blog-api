const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [3, 'Name must be at least 3 characters long'],
      required: [true, 'Please add a name']
    },
    body: {
      type: String,
      minlength: [4, 'Body must be at 4 characters long'],
      required: [true, 'Please add body']
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Comment', CommentSchema)
