// load up express module
var express = require('express')

// make a new Express router
var router = express.Router()

/* router to GET home page as HTML. */
router.get('/', function (req, res, next) {
  // render a view using the pug template
  res.render('index', {
    title: 'Townie'
  })
})


/* router to GET JSON object with a count of documents in the collection */
router.get('/count', function (req, res, next) {
  // connect to db and count documents
})

/* router to GET JSON object with the messages */
router.get('/messages', function (req, res, next) {
  // connect to db and get messages
})

module.exports = router
