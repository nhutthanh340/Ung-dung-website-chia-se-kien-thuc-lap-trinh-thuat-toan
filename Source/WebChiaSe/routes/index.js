var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.hbs', { title: 'Express' });
});

router.get('/single-blog', function(req, res, next) {
  res.render('single-blog.hbs', { title: 'Express' });
});



module.exports = router;
