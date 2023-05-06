const express = require('express');
const router = express.Router();

const { isProduction } = require('../../config/keys');

router.get('/', function(req, res, next) {
    res.json({
      message: "GET /api/csrf"
    });
  });
  

if (!isProduction) {
    // In development, allow developers to access the CSRF token to test the
    // server endpoints in Postman.
    router.get("/restore", (req, res) => {
      const csrfToken = req.csrfToken();
      res.status(200).json({
        'CSRF-Token': csrfToken
      });
    });
  }
module.exports = router;
