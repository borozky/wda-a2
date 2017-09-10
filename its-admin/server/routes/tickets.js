var express = require('express');
var axios = require("axios");

var router = express.Router();
const tickets_url = "http://127.0.0.1:8000/api/tickets/";

// GET: /api/tickets
router.get('/', function(req, res, next) {
    axios.get(tickets_url).then(function(response){
        return res.json(response.data);
    }).catch(function(error){
        return res.json(error);
    });
});

// GET: /api/tickets/5
router.get("/:ticketID", function(req, res, next){
    res.status(200).json(req.params);
});


module.exports = router;
