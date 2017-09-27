var express = require('express');
var axios = require("axios");
var router = express.Router();

const tickets_url = `${process.env.DATASOURCE_URL}api/tickets`;

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
    axios.get([ tickets_url, req.param("ticketID") ].join("/")).then(response => {
        return res.json(response.data);
    }).catch(error => {
        const status = error.response.status || 422;
        const data = error.response.data || [];
        return res.status(status).json(error.response.data);
    });
});

router.get("/:ticketID/comments", function(req, res, next){
    axios.get([ tickets_url, req.param("ticketID"), "comments" ].join("/")).then(response => {
        return res.json(response.data);
    }).catch(error => {
        const status = error.response.status || 422;
        const data = error.response.data || [];
        return res.status(status).json(error.response.data);
    });
});


module.exports = router;
