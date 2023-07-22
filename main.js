const apiKey = "467b9468ac57b443044062033ccbfea0";

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchInput = document.querySelector(".search-box input");

const searchButton = document.querySelector(".search-box button");

const weatherIcon = document.querySelector(".weather-image i");

const weather = document.querySelector(".weather");

const images = document.querySelector(".images");


async function checkWeather(city) {
 
  const response = await fetch(apiUrl + city + '&appid=' + apiKey);
  
  data = await response.json();
  
  if (data.message === 'Nothing to geocode') {
    alert('Введите город!');
 
  } else if (data.cod == 404) {
    alert('К сожалению я не знаю такого города :(')
  }
  else  {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "&#8451";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clear") {
      document.querySelector(".info").innerHTML = data.weather[0].description;
      images.src = './images/Clear.png'

    } else if (data.weather[0].main == "Rain") {
      document.querySelector(".info").innerHTML = data.weather[0].description;
      images.src = './images/Rain.png'
   
    } else if (data.weather[0].main == "Mist") {
      document.querySelector(".info").innerHTML = data.weather[0].description;
      images.src = './images/Mist.png'
    
    } else if (data.weather[0].main == "Drizzle") {
      document.querySelector(".info").innerHTML = data.weather[0].description;
      images.src = './images/Drizzle.png'
    
    } else if (data.weather[0].main == 'Clouds') {
      images.src = './images/Clouds.png'
      document.querySelector(".info").innerHTML = data.weather[0].description;
    }
  }
}


ymaps.ready(function(){
  ymaps.geolocation.get({
      provider: 'yandex'
  }).then(function (result) {
      let loc = result.geoObjects.get(0).properties._data.metaDataProperty.GeocoderMetaData.Address.formatted;
      checkWeather(loc)
  });
});

searchButton.addEventListener("click", () => {
  checkWeather(searchInput.value);
  searchInput.value = "";
});

searchInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    checkWeather(searchInput.value);
    searchInput.value = "";
  }
});
