/*globals angular, gsc */

//namespaces:
var mapView = {};

var app = angular.module('myApp', [ 
    'tink.navigation', 'tink.tinkApi', 'tink.modal', 'tink.accordion' ]);

//global helper functions

//hide images with broken urls
function imgError(image){
    image.style.display = 'none';
}

//get a timestamp in iso-notation
function getTimeStamp() {
        var now = new Date();
        return (now.getFullYear() + "-" +
        (now.getMonth() + 1) + '-' +
        (now.getDate()) + 'T' +
        now.getHours() + ':' +
        ((now.getMinutes() < 10)
                ? ("0" + now.getMinutes())
                : (now.getMinutes())) + ':' +
        ((now.getSeconds() < 10)
                ? ("0" + now.getSeconds())
                : (now.getSeconds())));
    }
