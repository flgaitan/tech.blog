const path = require('path')
let currentPath = path.join(__dirname)
const Comment = require('./Comment');
const Article = require('./Article');
const User = require('./User');

console.log(require('./Comment'));

//article - post relationship
User.hasMany(Article, {
    foreignKey: 'user_id'
});
//user - comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});
//article belongs to user
Article.belongsTo(User, {
    foreignKey: 'user_id',
});
//has many comments
Article.hasMany(Comment, {
    foreignKey: 'article_id'
});
//comment belongs to article
Comment.belongsTo(Article, {
    foreignKey: 'article_id'
});
//comment belongs to user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Article, Comment };