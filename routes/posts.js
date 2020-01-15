const express = require('express')
const { getPosts } = require('../controllers/posts')

const Post = require('../models/Post')

// const router = express.Router({ mergeParams: true })

const advancedResults = require('../middleware/advancedResults')
const { protect, authorize } = require('../middleware/auth')

router.route('/').get(advancedResults(Post), getPosts)
// .post(createUser)

// router
//   .route('/:id')
//   .get(getUser)
//   .put(updateUser)
//   .delete(deleteUser)

module.exports = router
