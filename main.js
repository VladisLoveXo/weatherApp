document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "467b9468ac57b443044062033ccbfea0";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  const searchInput = document.querySelector(".search-box input");
  const searchButton = document.querySelector(".fa-magnifying-glass");
  const navigationButton = document.querySelector(".fa-location-dot")
  const images = document.querySelector(".images");
  let loc;

  async function checkWeather(city) {
    const response = await fetch(apiUrl + city + '&appid=' + apiKey + "&lang=ru");
    const data = await response.json();
    
    console.log(Math.round(data.main.feels_like - 273.1) )
    if (data.message === "Nothing to geocode") {
      alert("Введите город!");
    } else if (data.cod == 404) {
      alert("К сожалению я не знаю такого города :(");
    } else {
    document.querySelector(".feels_like").innerHTML = `Ощущается как ${Math.round(data.main.feels_like - 273.1)} &#8451`;
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp - 273.1) + "&#8451";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " м/с";
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

  ymaps.ready(function () {
    ymaps.geolocation.get({
      provider: "yandex",
    }).then(function (result) {
      loc = result.geoObjects.get(0).properties._data.metaDataProperty.GeocoderMetaData.Address.formatted;
      checkWeather(loc);
    });
  });

  navigationButton.addEventListener("click", () => {
    checkWeather(loc)
  })

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
});
