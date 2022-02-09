const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
    res.render('index', { name: req.cookies.username });
  });

module.exports = router;