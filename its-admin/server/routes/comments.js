var express = require('express');
var axios = require("axios");
var router = express.Router();

const COMMENTS_DATASOURCE_URL = `${process.env.DATASOURCE_URL}api/comments`;

router.get('/', function(req, res, next) {
    axios.get(COMMENTS_DATASOURCE_URL).then(response => {
        return res.json(response.data);
    })
    .catch(error => {
        let status = error.response.status || 404;
        let data = error.response.data || [];
        return res.status(status).json(data);
    });
});

router.post('/', function(req, res, next){
    return axios.post(COMMENTS_DATASOURCE_URL, req.body)
    .then(response => {
        return res.json(response.data);
    }).catch(error => {
        const status = error.response.status || 422;
        const data = error.response.data || [];
        return res.status(status).json(error.response.data);
    });
});

module.exports = router;
