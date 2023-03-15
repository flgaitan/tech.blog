const router = require('express').Router();
const api = require('./../api')

const user = require('./user');
const comment = require('./comment');
const dashboard = require('./dashboard');
const editArticle = require('./editArticle');
const helpers = require('handlebars-helpers')();

router.use('/users', user);
router.use('/comment', comment);
router.use('/dashboard', dashboard);
router.use('/editArticle',editArticle);

module.exports = router;