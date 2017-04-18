/**
 * Created by liling on 12/5/16.
 */
app.factory('$httpService',['$http','$location','$q',function($http,$location,$q){
    var _this = {};
    _this.COMMON_AUTH_NAME ='auth-token';
    _this.USER_ID = "bmw-user-id";
    _this.BMW_USER_NAME = "bmw-user-name";
    _this.USER_PHONE = "bmw-user-phone";
    _this.USER_STATUS = "status";
    _this.TEMP_TOKEN = 'client-id';
    _this.CREATED_ON = "token-created"
    _this.BIZ_ID = "bmw-biz-id";
    _this.TYPE = "type";
    _this.BIZ_NAME = "biz-name";
    _this.LOGIN_PHONE = "login-phone";
    _this.LOGIN_PWD = "login-pwd";

    _this.setHeader = function(name,value) {
        $http.defaults.headers.common[name] = value;
    };

    _this.setHeader('Content-Type','application/json');

    _this.formPost = function(dom,url,$scope,success,error) {
        url = '/api' + (url[0]==='/'?'':'/') + url;
        var options = {
            url: url,
            type:'post',
            beforeSend: function(xhr) {
                xhr.setRequestHeader(_this.COMMON_AUTH_NAME,$.cookie(_this.COMMON_AUTH_NAME));
                //xhr.setRequestHeader(_this.TEMP_TOKEN,$.cookie(_this.TEMP_TOKEN));
                //xhr.setRequestHeader('Content-Type','multipart/form-data');
            },
            success: function(data) {
                if($.isFunction(success)) {
                    success(data);;
                }
            },
            error: function(data) {
               // checkAuthorizedStatus(data);
                if($.isFunction(error)) {
                    error(data);
                }
            }
        };
        $(dom).ajaxSubmit(options);
    };
    var fnArray = ['get','delete','jsonp','head','post','put'];
    for(var i in fnArray) {
        (function(fn) {
            _this[fn] = function(url,param) {
                url = '/api' + (url[0]==='/'?'':'/') + url;
                var deferred = $q.defer();
                //only 'post,put' need 2nd parameter
                $http[fn](url,param).success(function(data){
                    deferred.resolve(data);
                }).error(function(data){
                    checkAuthorizedStatus(data);
                    deferred.reject(data);
                });
                return deferred.promise;
            };
        })(fnArray[i]);
    }

    function checkAuthorizedStatus(data) {
        if(!angular.isUndefined(data.outMsg) && data.outMsg=="Access token error ,the Api can't be accessed") {
            //$.cookie(_this.COMMON_AUTH_NAME,"");
            //window.location.href="admin_login.html";
            //$.cookie(_this.ADMIN_AUTH_NAME,"");
            window.location.href="login.html#/login?whereCome=any";
        }
    }
   // _this.setHeader(_this.TEMP_TOKEN,_this.getCookie(_this.TEMP_TOKEN));
    return _this;
}]);

app.factory("product2",function(){
    return {};
})