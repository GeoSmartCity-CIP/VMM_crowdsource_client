/*globals $*/

var geocoder = {}

geocoder.suggestion = function (term , count, callback) {
    var url = "https://loc.api.geopunt.be/v2/Suggestion";
    if (window.location.protocol != "https:"){
        url = "http://loc.api.geopunt.be/v2/Suggestion";
    }
    $.ajax({
            url: url,
            dataType: "jsonp",
            data: {
                q: term ,
                c: count
            },
            success: function( data ) {
                var straten = data.SuggestionResult;
                callback( straten );  
            }
    });
}