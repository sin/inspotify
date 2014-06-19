$('document').ready(function () {
    'use strict';
    var search, getTracks, ajax, render, openTrack,
        wsURL = "http://ws.spotify.com/search/1/track.json?q=",
        resultsTemplate = $('#resultsTemplate').html(),
        noSearchTemplate = $('#noSearchTemplate').html(),
        input = $('#input'),
        results = $('#results');

    search = function (event) {
        if ([13, 16, 18].indexOf(event.which) !== -1) {
            //event.stopPropagation();
            return;
        }
        if (ajax) {
            ajax.abort();
        }
        if (event.delegateTarget.value.length > 0) {
            getTracks(event.delegateTarget.value);
        } else {
            var output = Mustache.render(resultsTemplate, {});
            results.html(output);
        }
        //event.stopPropagation();
    };

    getTracks = function (q) {
        ajax = $.getJSON(wsURL + q + '*', function (res) {
            console.log(res);
            ajax = undefined;
            render(res);
        });
    };

    render = function (data) {
        var i, len, track, output;

        data.info.query = data.info.query.slice(0, -1);
        data.info.showing = data.tracks.length;

        for (i = 0, len = data.tracks.length; i < len; i = i + 1) {
            track = data.tracks[i];
            track.index = i + 2;
            track.len = Math.floor(track.length);
            track.min = Math.floor(track.len / 60);
            track.sec = String(track.len % 60);
            track.time = track.min + ":" + (track.sec.length < 2 ? "0" + track.sec : track.sec);
            track.popularity = Math.floor(track.popularity * 20);
        }

        output = Mustache.render(resultsTemplate, data);
        results.html(output);

        $('tr').bind('keypress dblclick', openTrack);
    };

    openTrack = function (event) {
        if ((event.type === 'keypress' && event.which === 13) || event.type === 'dblclick') {
            window.location = $(event.delegateTarget).data('href');
            //event.stopPropagation();
        } else if (event.keyCode !== 9) {
            input.focus();
        }
    };

    $('body').bind('keypress', function (event) {
        if (event.keyCode !== 9) {
            input.focus();
        }
    });

    input.keyup(search);
    input.focus();
    input.keyup();
});