const sequelize = require('../../config/connection');
const router = require('express').Router();
const { Article, User } = require('../../models');
const withAuth = require('../../utils/auth');
var helpers = require('handlebars-helpers')();

router.get('/', withAuth, async (req,res) => {
    try {
        console.log('dashboard : ' + req.session.user_id);
        const userID = req.session.user_id;
        await Article.findAll({
            where: {
                username_id:userID
            },
            attributes: ['id','title','content','createdAt'],
            include: User
        })
        .then (data => {
            console.log('dashboard');
            const articles = data.map(article => article.get({ plain:true }));
            const view = JSON.stringify(data);
            console.log('dashboard', view);
            res.render('dashboard',{ articles,logged_in: req.session.logged_in, });
            res.status(200);
        });
    }
    catch (err){
        res.status(500).json(err);
    }
});

//post article
router.post('/', withAuth, (req, res) => {
    try {
        console.log('dashboard.js');

        Article.create({
            title: req.body.title,
            content: req.body.content,
            username_id: req.session.user_id
        })
        .then(newArticle => {
            res.json(newArticle);
        })
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;