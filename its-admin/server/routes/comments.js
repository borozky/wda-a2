var express = require('express');
var axios = require("axios");
var router = express.Router();

const COMMENTS_DATASOURCE_URL = "http://localhost:8000/api/comments";
router.get('/', function(req, res, next) {
    axios.get(COMMENTS_DATASOURCE_URL).then(response => {
        return res.json(response.data);
    })
    .catch(error => {
        return res.status(404);
    });
});

module.exports = router;
