const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
var helpers = require('handlebars-helpers')();

//post comment
router.post('/', withAuth, (req, res) => {
    try {
        console.log('comment.js');
        Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,
            article_id: req.body.article_id
        })
        .then(newComment => {
            res.json(newComment);
        })
    } catch (err) {
        res.status(400).json(err);
    }
});
  
module.exports = router;