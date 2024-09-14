const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
// Route for root path
router.get('/', (req, res) => {
  res.send('Welcome to the Social Network API!');
});

router.use((req, res) => {
  res.status(404).send('<h1>404 Error!</h1>');
});

module.exports = router;