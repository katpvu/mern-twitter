const express = require('express');
const router = express.Router();

/* GET tweets  */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/csrf"
  });
});

module.exports = router;
