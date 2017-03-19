var express = require('express'),
    logger = require('morgan'),
    favicon = require('serve-favicon'),
    compress = require('compression'),
    app = express();

var PORT = 8080,
    CACHE_TIME = 345600000;

app.use(favicon(__dirname + '/dist/favicon.ico', { maxAge:  }));
app.use(logger('dev'));
app.use(compress());

app.use(function (req, res, next) {
    'use strict';
    if (req.url.indexOf('/js/') === 0 || req.url.indexOf('/css/') === 0 || req.url.indexOf('/img/') === 0) {
        res.setHeader("Cache-Control", "public, max-age=0");
        res.setHeader("Expires", new Date(Date.now() + 345600000).toUTCString());
    }
    next();
});

app.use(express.static(__dirname + '/dist'));

app.listen(PORT);
console.log('Listening on port ' + PORT + '.');
