var express = require('express');
var router = express.Router();

var datasource_url = `${process.env.DATASOURCE_URL}`;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send(datasource_url);
});

module.exports = router;
