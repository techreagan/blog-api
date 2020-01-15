const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    title: {
      type: String,
      minlength: [6, 'Title must be at least 6 characters long'],
      required: [true, 'Please add a title']
    },
    body: {
      type: String,
      minlength: [6, 'Body must be at 6 characters long'],
      required: [true, 'Please add body']
    },
    banner_image: {
      type: String,
      default: 'default.jpg'
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', PostSchema)
