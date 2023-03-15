const router = require('express').Router();
const { User } = require('../../models');
const helpers = require('handlebars-helpers')();

//route for logging in
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
        return;
      }
      //validates for password
      const validatePassword = await userData.checkPassword(req.body.password);
      if (!validatePassword) {
        res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
        return;
      }
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        req.session.username = userData.username;
        res.json({ user: userData, message: 'You are now logged in!' });
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

//log out
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
    res.status(204).end();
  });
} else {
    res.status(500).end();
  }
});

//signup
router.post('/signup', (req, res) => {
  try {
    console.log(req.body.username, req.body.email, req.body.password);
    //creates new user
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    .then(newUser => {
      req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      req.session.username = newUser.username;
      res.json({ user: newUser, message: 'You are now logged in!' });
    });
  })
} catch (err) {
  res.status(400).json(err);
}
});

module.exports = router;
