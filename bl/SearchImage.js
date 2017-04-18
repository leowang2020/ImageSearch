//var https = require('https');
var request = require('request');
function myImageUpload(req, res, next) {
    console.log("Ready for request");
    console.log("I am here", req.params.imgName);

    request({
        url: 'http://api0.wozhitu.com:8084/vsearchtech/api/v1.0/apisim_detail', //URL to hit
        qs: {from: 'blog example', time: +new Date()}, //Query string data
        method: 'POST',
        //Lets post the following key/values as form
        form: {
            'apikey': 'senyuanTest1123_sim',
            'imgname': req.params.imgName
        }

    }, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            console.log("body--",body);
            console.log("Going to send response back to client!");
          
           // console.log("response===",response.body);
            var data = JSON.parse(body);
            res.send(200,{
             success:true,
             data: data
             });
           // console.log("After send response!");
        }
    });
}

module.exports = {
    imgUpload: myImageUpload
}