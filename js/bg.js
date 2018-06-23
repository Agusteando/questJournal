var api;
var rss;

$(document).ready(function() {
    
var yql = "https://query.yahooapis.com/v1/public/yql?q=select%20enclosure%20from%20rss%20where%20url%3D%22https%3A%2F%2Fwww.nasa.gov%2Frss%2Fdyn%2Flg_image_of_the_day.rss%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";  

var apiUrl = "https://api.nasa.gov/planetary/apod?api_key=9IGkozUJ5FkugzkdzQYzpDdDavII0aruDEnfwyYN"; 
    
    $.getJSON(yql, function(res) {

rss = JSON.stringify(res.query.results.item[0].enclosure.url);


console.log(rss)
$('#bg').css("background-image", "url("+rss+")");

    }, "jsonp");

    $.getJSON(apiUrl, function(res) {


api = JSON.stringify(res.hdurl); 

console.log(api)

    }, "jsonp");



});