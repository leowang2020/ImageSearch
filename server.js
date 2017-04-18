/**
 * Created by liling on 7/16/16.
 */
var fs = require('fs');
var restify = require('restify');
var path = require('path');
var searchImg = require('./bl/SearchImage.js');
var matchImg = require('./bl/MatchImage.js');
var addImg = require('./bl/AddImage.js');

function createServer(options) {
    var server = restify.createServer({
        name: 'mp',
        version: '1.0.0'
    });

    // Clean up sloppy paths like
    server.pre(restify.pre.sanitizePath());

    // Handles annoying user agents (curl)
    server.pre(restify.pre.userAgentConnection());

    //server.use(roleBase.checkAuthToken);
    server.use(restify.throttle({
        burst: 100,
        rate: 50,
        ip: true
    }));

    restify.CORS.ALLOW_HEADERS.push('tenant');
    restify.CORS.ALLOW_HEADERS.push('auth-token');
    restify.CORS.ALLOW_HEADERS.push('client-id');
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Origin");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Credentials");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Methods", "GET");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Methods", "POST");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Methods", "PUT");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Methods", "DELETE");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Headers", "accept,api-version, content-length, content-md5,x-requested-with,content-type, date, request-id, response-time");
    server.use(restify.CORS());
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.dateParser());
    server.use(restify.authorizationParser());
    server.use(restify.queryParser());
    server.use(restify.gzipResponse());
    server.use(restify.fullResponse());
    server.use(restify.bodyParser({uploadDir: __dirname + '/uploads/'}));
  //  server.use(authHeaderParser.authHeaderParser({logger: logger, authUrl: sysConfig.authService.url}));

    var STATIS_FILE_RE = /\.(css|js|jpe?g|png|gif|less|eot|svg|bmp|tiff|ttf|otf|woff|pdf|ico|json|wav|ogg|mp3?|xml)$/i;
    server.get(STATIS_FILE_RE, restify.serveStatic({ directory: './web', default: 'login.html', maxAge: 0 }));


    server.get(/\.html$/i,restify.serveStatic({
        directory: './web',
        maxAge: 0
    }));

    server.get('/',restify.serveStatic({
        directory: './web',
        default: 'index.html',
        maxAge: 0
    }));

    //消息模块
    server.post({path: '/api/imgUpload',
        contentType: 'application/json'}, searchImg.imgUpload);
    server.post({path: '/api/match/keyword/:keyword/imgUpload',
        contentType: 'multipart/form-data'}, matchImg.searchImg);
    server.post({path: '/api/match/imgUpload',
        contentType: 'multipart/form-data'}, matchImg.searchImgWithoutSubject);
    server.post({path: '/api/addImage',
        contentType: 'multipart/form-data'}, addImg.addImage);

    server.on('NotFound', function (req, res, next) {
        res.send(404);
        next();
    });
    return (server);
}

module.exports = {
    createServer: createServer
};