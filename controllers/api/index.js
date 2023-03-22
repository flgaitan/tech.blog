const router = require('express').Router();
const api = require('./../api')

const User = require('./user');
const Comment = require('./comment');
const Dashboard = require('./dashboard');
const editArticle = require('./editArticle');
const helpers = require('handlebars-helpers')();

router.use('/user', User);
router.use('/comment', Comment);
router.use('/dashboard', Dashboard);
router.use('/editArticle',editArticle);

module.exports = router;