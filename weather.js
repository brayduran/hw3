let updateWidget = function(data) {
  let tempFarenheit = parseInt(data.main.temp)
  let cityName = data.name
  document.getElementById("weather").getElementsByClassName("card-title")[0].innerHTML = cityName
  let img_url_iconID = data.weather[0].icon
  let img_full_url = "http://openweathermap.org/img/w/"+img_url_iconID+".png"

  document.getElementById("weather").getElementsByClassName("card-text")[0].innerHTML = "It is "+tempFarenheit+" degrees outside."
  $("img").attr("src", img_full_url)

}



let getWeather = function(data) {

  let userPosition = "https://maps.googleapis.com/maps/api/staticmap?center="
  let latitude = data.coords.latitude.toFixed(4);
  let longitude = data.coords.longitude.toFixed(4);
  let apiKey = 'dde56ae030040dafa62714f2a033db2b';

  let weatherServiceURL = 'https://api.openweathermap.org/data/2.5/weather?'
  weatherServiceURL += 'lat=' + latitude
  weatherServiceURL += '&lon=' + longitude
  weatherServiceURL +='&appid=' + apiKey + '&units=imperial'

  fetch(weatherServiceURL).then(convertToJSON).then(updateWidget).catch(displayError);
}

let handlePosition = function(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getWeather)
}

$('#get_forecast').on("click", handlePosition)

////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANY CODE BEYOND THIS POINT
////////////////////////////////////////////////////////////

let convertToJSON = function(rawData) { return rawData.json(); }
let displayError = function(error) { console.debug(error); }
