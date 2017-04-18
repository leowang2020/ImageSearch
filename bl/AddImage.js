var request = require('request');
var fs = require('fs');
function addImage(req, res, next) {
    console.log("Ready for request");
   // var fileName = req.files.sampleFile.name;
   // console.log("req",req.files.null.name);
    //console.log("req file name == ",req.files.photo.name);
    console.log("req file path == ",req.files.path);

    request({
        url: 'http://api0.wozhitu.com:8084/vsearchtech/api/v1.0/apisim_search', //URL to hit
        qs: {from: 'blog example', time: +new Date()}, //Query string data
        method: 'POST',
        //Lets post the following key/values as form
        /*form: {
            'apikey': 'senyuanTest1123_sim'
            //'imgname': req.files.photo.name,
            //'photo': formData
        },*/
        formData: {
            "apikey": 'senyuanTest1123_sim',
            "photo": fs.createReadStream(__dirname + '/upload_4b2a7b93b1daee51a720c882b66d9dce')
        }
    }, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            console.log("body--",body);
            console.log("Going to send response back to client!");

            // console.log("response===",response.body);
            var data = JSON.parse(body);
            res.send(500,{
                success:true,
                data: data
            });
            // console.log("After send response!");
        }
    });
}

module.exports = {
    addImage: addImage
}
