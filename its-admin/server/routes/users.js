var express = require('express');
var axios = require("axios");
var router = express.Router();

const USERS_DATASOURCE_URL = "http://localhost:8000/api/users";

/* GET users listing. */
router.get('/', function(req, res, next) {
  axios.get(USERS_DATASOURCE_URL).then(function(response){
    return res.json(response.data);
  }).catch(function(error){
    return res.json(error);
  });
});

module.exports = router;
