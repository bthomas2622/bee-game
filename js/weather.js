$.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather?id=5378538&APPID=d080a1df193efbbce7564682f5782250&units=imperial',
    dataType: "jsonp",
    jsonp: "callback",
    async: true,
}).done(function(data, textStatus, jqXHR) {
    $('#currentWeather').replaceWith('<span id="currentWeather">' + (Math.round(data.main.temp_min) + 2) + ' &deg;F ' + data.weather[0].description + '</span>');
}).fail(function(){
	$('#weatherCond').append('<div>Unavailable</div>');
});