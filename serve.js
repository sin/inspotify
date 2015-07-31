var express = require('express'),
    logger = require('morgan'),
    app = express();

app.use(express.favicon(__dirname + '/dist/favicon.ico', { maxAge: 345600000 }));
app.use(logger('dev'));
app.use(express.compress());

app.use(function (req, res, next) {
    'use strict';
    if (req.url.indexOf('/js/') === 0 || req.url.indexOf('/css/') === 0 || req.url.indexOf('/img/') === 0) {
        res.setHeader("Cache-Control", "public, max-age=0");
        res.setHeader("Expires", new Date(Date.now() + 345600000).toUTCString());
    }
    next();
});

app.use(express.static(__dirname + '/dist'));

app.listen(8080);