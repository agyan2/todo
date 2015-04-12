//Abhinav Test application
var express = require('express');
var router = express.Router();


    // application -------------------------------------------------------------
    router.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    module.exports = router;