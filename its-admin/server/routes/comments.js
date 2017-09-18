var express = require('express');
var axios = require("axios");
var router = express.Router();

const COMMENTS_DATASOURCE_URL = `${process.env.DATASOURCE_URL}api/comments`;
router.get('/', function(req, res, next) {
    axios.get(COMMENTS_DATASOURCE_URL).then(response => {
        return res.json(response.data);
    })
    .catch(error => {
        return res.status(404);
    });
});

module.exports = router;
