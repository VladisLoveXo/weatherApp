document.addEventListener("DOMContentLoaded", function () {

  const apiKey = "467b9468ac57b443044062033ccbfea0";


  const searchInput = document.querySelector(".search-box input");
  const searchButton = document.querySelector(".fa-magnifying-glass");
  const locationButton = document.querySelector(".fa-location-dot");
  const images = document.querySelector(".images");


  let userCoords = null;


  async function checkWeatherByCity(city) {
    if (!city) {
      alert("Введите город!");
      return;
    }


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=ru`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === "404") {
        alert("К сожалению, я не знаю такого города :(");
      } else if (data.message === "Nothing to geocode") {
        alert("Введите корректное название города!");
      } else {
        renderWeatherData(data);
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных о погоде:", error);
      alert("Произошла ошибка при получении данных о погоде.");
    }
  }

  async function checkWeatherByCoords(lat, lon) {
    if (lat == null || lon == null) {
      alert("Координаты не получены!");
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=ru`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === "400" || data.cod === "404") {
        alert("Не удалось найти погоду по данным координатам.");
      } else {
        renderWeatherData(data);
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных о погоде:", error);
      alert("Произошла ошибка при получении данных о погоде.");
    }
  }


  function renderWeatherData(data) {

    const tempC = Math.round(data.main.temp - 273.15);
    const feelsLikeC = Math.round(data.main.feels_like - 273.15);

    document.querySelector(".feels_like").innerHTML = `Ощущается как ${feelsLikeC} &#8451;`;
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = tempC + "&#8451;";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " м/с";
    document.querySelector(".info").innerHTML = data.weather[0].description;


    if (data.weather[0].main === "Clear") {
      images.src = "./images/Clear.png";
    } else if (data.weather[0].main === "Rain") {
      images.src = "./images/Rain.png";
    } else if (data.weather[0].main === "Mist") {
      images.src = "./images/Mist.png";
    } else if (data.weather[0].main === "Drizzle") {
      images.src = "./images/Drizzle.png";
    } else if (data.weather[0].main === "Clouds") {
      images.src = "./images/Clouds.png";
    } else {
      images.src = "./images/Clear.png";
    }
  }


  ymaps.ready(function () {
    ymaps.geolocation.get({
      provider: "yandex",
    }).then(function (result) {
 
      userCoords = result.geoObjects.get(0).geometry.getCoordinates();

      checkWeatherByCoords(userCoords[0], userCoords[1]);
    }).catch(function (error) {
      console.error("Не удалось получить координаты пользователя:", error);
      alert("Невозможно определить геолокацию. Попробуйте ввести город вручную.");
    });
  });


  locationButton.addEventListener("click", () => {
    if (userCoords) {
 
      checkWeatherByCoords(userCoords[0], userCoords[1]);
    } else {
      alert("Координаты не получены или не определены!");
    }
  });


  searchButton.addEventListener("click", () => {
    const city = searchInput.value.trim();
    checkWeatherByCity(city);
    searchInput.value = "";
  });


  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const city = searchInput.value.trim();
      checkWeatherByCity(city);
      searchInput.value = "";
    }
  });
});
