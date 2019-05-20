var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.hbs', { title: 'Express' });
});

router.get('/single-blog', function(req, res, next) {
  res.render('single-blog.hbs', { title: 'Express' });
});
router.get('/blog', function(req, res, next) {
  res.render('blog.hbs', { title: 'Express' });
});
router.get('/courses', function(req, res, next) {
  res.render('courses.hbs', { title: 'Express' });
});
router.get('/elements', function(req, res, next) {
  res.render('elements.hbs', { title: 'Express' });
});
router.get('/contact', function(req, res, next) {
  res.render('contact.hbs', { title: 'Express' });
});
router.get('/course-details', function(req, res, next) {
  res.render('course-details.hbs', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login.hbs', { title: 'Express' });
});


module.exports = router;
