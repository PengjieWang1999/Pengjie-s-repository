const request = require('request')

var getCapital = (country) => {
	return new Promise((resolve, reject) => {
		request({
	url: `https://restcountries.eu/rest/v2/name/${encodeURIComponent(country)}?fullText=true`,
	json: true
}, (error, response, body) => {
	if (body.status != 404) {
		resolve([body[0].capital, body[0].name]);
	} else {
		reject('Cannot find the capital');
	};

}) 
	});
};


var getWeather = (capital, country) => {
	return new Promise((resolve, reject) => {
		request({
	url: `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(capital)}&units=imperial&appid=e7c3431b47cdeae4793269435b907ae6`,
	json: true
}, (error, response, body) => {
	if (body.cod != 404) {
		resolve(`The weather in ${body.name}, capital of ${country} is ${body.main.temp} degrees Fahrenheit with wind speed of ${body.wind.speed}`);
	} else {
		reject('Cannot find the weather');
	};

}) 
	});
};

module.exports = {
	getCapital,
	getWeather
}