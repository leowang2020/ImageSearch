/**
 * Created by liling on 12/3/16.
 */
app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/',{
            templateUrl:'views/mainPage.html',
            controller: 'searchPictureController'
        })
        .when('/search',{
            templateUrl:'views/searchPage.html',
            controller: 'searchResultController'
        })
        .when('/detail',{
            templateUrl:'views/pictureDetail.html',
            controller:'picDetailController'
        })
        .otherwise({
            templateUrl:'views/NotFound.html'
        });
})