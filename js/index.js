var apiURL = "https://fcc-weather-api.glitch.me/api/current?";
var weather = {
  main: '',
  code: 0,
  temp: 0,
  location: {
    city: '',
    country: '',
    lat: 0,
    lon: 0
  },
  humidity: 0
};

function errf(error){
console.log(error.message);
}

$(document).ready(function() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){
        weather.location.lat = pos.coords.latitude;
        weather.location.lon = pos.coords.longitude;
        console.log(weather);
        getWeather();
    }, errf,{ enableHighAccuracy: false });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
});



function getWeather() {
  var urlString = apiURL + "lon=" + weather.location.lon + "&lat=" + weather.location.lat;
  $.ajax({
    url: urlString, success: function (result) {
      weather.location.city = result.name;
      weather.code = result.weather[0].id;
      weather.location.country = result.sys.country;
      weather.temp = Math.round(result.main.temp * 10) / 10;
      weather.humidity = Math.round(result.main.humidity * 10) / 10;
      weather.main = result.weather[0].main;
      weather.location.lat = weather.location.lat.toFixed(2);
      weather.location.lon = weather.location.lon.toFixed(2);
      console.log(weather);
      handleWeather();
    }
  });
};

function handleWeather() {
  $("#city").text(weather.location.city + ", ");
  $("#country").text(weather.location.country);
  $("#temp").text(weather.temp + " " + String.fromCharCode(176) + "C");
  $("#main").text(weather.main);
  handleIcon(); // #weather-icon
  $("#humidity").text("Humidity : " + weather.humidity + "%");
  $("#location").text("Longitude : " + weather.location.lon + "\nLatitude : " + weather.location.lat);
};

function handleIcon(weatherCode = weather.code) {
  var el = document.getElementById("weather-icon");
  var iconCode = "";
  switch(weatherCode){
    case 200:
    case 201:
    case 202:
    case 230:
    case 231:
    case 232:
      iconCode = "wi-storm-showers";
      break;
    case 210:
    case 211:
    case 212:
    case 221:
      iconCode = "wi-thunderstorm";
      break;
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321:
      iconCode = "wi-hail";
      break;
    case 500:
    case 501:
      iconCode = "wi-rain";
      break;
    case 502:
    case 503:
    case 504:
    case 511:
      iconCode = "wi-rain-wind";
      break;
    case 520:
    case 521:
    case 522:
    case 531:
      iconCode = "wi-showers";
      break;
    case 611:
    case 612:
    case 615:
    case 616:
      iconCode = "wi-sleet";
      break;
    case 600:
    case 601:
    case 602:
    case 620:
    case 621:
    case 622:
      iconCode = "wi-snow";
      break;
    case 701:
    case 711:
    case 721:
    case 741:
      iconCode = "wi-smoke";
      break;
    case 731:
    case 751:
    case 761:
      iconCode = "wi-dust";
      break;
    case 781:
      iconCode = "wi-tornado";
      break;
    case 800:
      iconCode = "wi-day-sunny";
      break;
    case 801:
    case 802:
      iconCode = "wi-cloud";
      break;
    case 803:
    case 804:
      iconCode = "wi-cloudy";
      break;
    default:
      iconCode = "wi-alien";
      break;
  }
  el.innerHTML = '<i class="wi ' + iconCode + '"></i>';
};