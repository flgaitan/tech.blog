const sequelize = require('../config/connection');

const router = require('express').Router();
const { Article, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

//Get all articles
router.get('/', async (req, res) => {
    try {
        const articleData = await Article.findAll({
            attributes: ['id', 'title', 'content', 'createdAt'],
            include: User,

        })
            .then(data => {
                console.log(data);
                const articles = data.map(article => article.get({ plain: true }));
                //check
                console.log('homeroutes');
                res.render('homepage', { articles, logged_in: req.session.logged_in, });
                res.status(200);
            });
    } catch (err) {
        res.status(500).json(err);
    }

});

//article + comments
router.get('/article/:id', withAuth, async (req, res) => {
    try {
        const articleData = await Article.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'title', 'content', 'createdAt'],
            include: [User, {
                model: Comment,
                attributes: ['id', 'content', 'username_id', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }],
        })
            .then(article => {
                console.log('homeroutes');
                const data = article.get({ plain: true });
                res.render('single-article', { data, logged_in: req.session.logged_in, current_user: req.session.username });
                console.log('homeroutes');
            });
    } catch (err) {
        res.status(500).json(err);
    }

});

//logging in
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

//get all articles with comments
router.get('/comment', async (req, res) => {
    try {
        const articleData = await Article.findOne({
            where: { id: 1 },
            include: [User, {
                model: Comment,
                attributes: ['id', 'content', 'username_id', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }],
        });
        console.log('display article data' + articleData);
        res.status(200).json(articleData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;