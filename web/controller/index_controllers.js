/**
 * Created by liling on 12/4/16.
 */


app.controller('searchPictureController', ['$rootScope', '$scope', '$http', '$httpService', 'fileReader','myService','myPictureService','$location', '$window', function ($rootScope, $scope, $http, $httpService, fileReader,myService,myPictureService,$location, $window) {
    $scope.getFile = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function (result) {
                $scope.picture = result;
                $("#bizLicImg").attr("src", result);
            });
    };

    $scope.$on("fileProgress", function (e, progress) {
        $scope.progress = progress.loaded / progress.total;
    });

    //for show image upload dialog
    $scope.bindFile = function ($event) {
        $($event.target).next().trigger('click');
        console.log("event",event);
    };

    $scope.openUpload = function () {
        console.log("11111");
        $('#bizLicImg').val("");
        $('#bizLicImg').trigger('click');
    };

    $scope.search = function () {
        //$scope.keyword = document.getElementById('searchKeyword').value;
        myService.set($('#uploadImageForm'));
        $scope.fileName = $scope.file.name;
        myPictureService.set($scope.keyword);
    }
}]);

app.controller('searchResultController', ['$rootScope', '$scope', '$http', '$httpService', 'fileReader','myService','myPictureService','$location', '$window',
    function ($rootScope, $scope, $http, $httpService, fileReader,myService,myPictureService,$location, $window) {
        $scope.getFile = function () {
            $scope.progress = 0;
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function (result) {
                    $scope.picture = result;
                    $("#bizLicImg11").attr("src", result);
                });
        };
        $scope.bindFile = function ($event) {
            $($event.target).next().trigger('click');
            console.log("event",event);
        };
        $scope.openUpload = function () {
            console.log("11111");
            $('#bizLicImg11').val("");
            $('#bizLicImg11').trigger('click');
        };

        $scope.img = myService.get();
        $scope.keyword = myPictureService.get();
        console.log($scope.keyword);
        if ($scope.keyword === undefined) {
            $httpService.formPost($scope.img, '/match/imgUpload ', '$scope', function (result) {
                if (result.success) {
                    //$scope.resultShow = true;
                    //$("#bizLicImg11").attr("src", "assets/images/add_icon.png");
                    $scope.imageService = 'http://api0.wozhitu.com:8084/vsearchtech/static/imgs/imgs/';
                    $scope.products2 = result.data.resultList;
                    $scope.$apply('products2');
                    console.log($scope.products2);
                } else {
                    console.log('上传图片失败');
                }
            }, function (error) {
                console.log('服务器内部错误');
            });
        } else {
            $httpService.formPost($scope.img, '/match/keyword/' + $scope.keyword + '/imgUpload ', '$scope', function (result) {
                if (result.success) {
                    //$scope.resultShow = true;
                    //$("#bizLicImg11").attr("src", "assets/images/add_icon.png");
                    $scope.imageService = 'http://api0.wozhitu.com:8084/vsearchtech/static/imgs/imgs/';
                    $scope.products2 = result.data.resultList;
                    $scope.$apply('products2');
                    console.log($scope.products2);
                } else {
                    console.log('上传图片失败');
                }
            }, function (error) {
                console.log('服务器内部错误');
            });
        }

        $scope.search = function () {
            if ($scope.keyword === undefined) {
                $httpService.formPost($('#uploadImageForm11'), '/match/imgUpload', '$scope',function (result) {
                    if (result.success) {
                        //$scope.resultShow = true;
                        //$("#bizLicImg11").attr("src", "assets/images/add_icon.png");
                        $scope.imageService = 'http://api0.wozhitu.com:8084/vsearchtech/static/imgs/imgs/';
                        $scope.products2 = result.data.resultList;
                        $scope.$apply('products2');
                        console.log($scope.products2);
                    } else {
                        console.log('上传图片失败');
                    }
                }, function (error) {
                    console.log('服务器内部错误');
                });
            } else {
                $httpService.formPost($('#uploadImageForm11'), '/match/keyword/' + $scope.keyword + '/imgUpload ', '$scope', function (result) {
                    if (result.success) {
                        $scope.imageService = 'http://api0.wozhitu.com:8084/vsearchtech/static/imgs/imgs/';
                        $scope.products2 = result.data.resultList;
                        $scope.$apply('products2');
                        console.log($scope.products2);
                    } else {
                        console.log('上传图片失败');
                    }
                }, function (error) {
                    console.log('服务器内部错误');
                });
            }
        }

        var modal = document.getElementById('myModal');

        // Get the image and insert it inside the modal - use its "alt" text as a caption
        var img = document.getElementById('myImg');
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");

        $scope.imageModal = function (e, p) {
            $scope.imgModalName = p.imgName;
            $scope.imgModalScore = p.score;
            $scope.imgModalKeyword = p.keyword;
            modalImg.src = e.path[0].src;
        }
}]);


app.directive("ngFileSelect", function () {
    return {
        link: function ($scope, el) {
            el.bind("change", function (e) {
                $scope.file = (e.srcElement || e.target).files[0];
                $scope.getFile();
            })
        }
    }
});