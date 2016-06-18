$.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather?id=5378538&APPID=d080a1df193efbbce7564682f5782250',
    dataType: "jsonp",
    jsonp: "callback",
    async: true,
}).done(function(data, textStatus, jqXHR) {
    $('#weatherCond').append('<div><p>' + data.wind.speed + '</p></div>');
}).fail(function(){
	$('#weatherCond').append('<div>Apologies the Weather request timed out</div>');
});