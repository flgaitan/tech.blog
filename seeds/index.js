const sequelize = require('../config/connection');
const { User, Comment, Article } = require('../models');

const userDb = require('./user-seeds.json');
const commentDb = require('./comment-seeds.json');
const articleDb = require('./article-seeds.json');

const seedData = async () => {
    await sequelize.sync({ force: true });
//creating for user
    const users = await User.bulkCreate(userDb, {
        individualHooks: true,
        returning: true,
    });
    console.log('------USER SEEDED--------');

//creating for article
const articles = await Article.bulkCreate(articleDb, {
    individualHooks: true,
    returning: true,
});

    console.log('------ARTICLE SEEDED--------');

//creating for comment
    const comments = await Comment.bulkCreate(commentDb, {
        individualHooks: true,
        returning: true,
});

    console.log('------COMMENT SEEDED--------');



    process.exit(0);

};

seedData();