/*globals angular, gsc */
gsc.cs.csUrl("http://localhost:8080/CrowdSourcing" );

var app = angular.module('myApp', [ 
    'tink.navigation', 'tink.tinkApi', 
    'tink.modal', 'tink.accordion' ]);
