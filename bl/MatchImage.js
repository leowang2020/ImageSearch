//var https = require('https');
var request = require('request');
var path = require('path');
var fs = require('fs');
function mySearchImg(req, res, next) {
    console.log("Ready for request");
    console.log("I am here", req.files.sampleFile.name);
    console.log("req file path == ",req.files.sampleFile.path);
    var myFilePath = req.files.sampleFile.path;
    request({
        url: 'http://api0.wozhitu.com:8084/vsearchtech/api/v1.0/apisim_search', //URL to hit
        qs: {from: 'blog example', time: +new Date()}, //Query string data
        method: 'POST',
        formData: {
            "apikey": 'senyuanTest1123_sim',
            "subject": req.params.keyword,
            "photo": fs.createReadStream(myFilePath)
        }
    }, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            console.log("body--",body);
            console.log("Going to send response back to client!");

            var data = JSON.parse(body);
            res.send(200,{
                success:true,
                data: data
            });
        }
    });
}


function SearchImg(req, res, next) {
    console.log("Ready for request");
    console.log("I am here", req.files.sampleFile.name);
    console.log("req file path == ",req.files.sampleFile.path);
    var myFilePath = req.files.sampleFile.path;
    request({
        url: 'http://api0.wozhitu.com:8084/vsearchtech/api/v1.0/apisim_search', //URL to hit
        qs: {from: 'blog example', time: +new Date()}, //Query string data
        method: 'POST',
        formData: {
            "apikey": 'senyuanTest1123_sim',
            "photo": fs.createReadStream(myFilePath)
        }
    }, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            console.log("body--",body);
            console.log("Going to send response back to client!");

            var data = JSON.parse(body);
            res.send(200,{
                success:true,
                data: data
            });
        }
    });
}

module.exports = {
    searchImg: mySearchImg,
    searchImgWithoutSubject:SearchImg
}
