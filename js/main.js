let weather = {
  apiKey: "52e6b626dc3083f3155b1d22cbd5c7bd",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&lang=ru&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("Результаты не найдены.");
          throw new Error("Результаты не найдены.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, feels_like, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Погода в городе " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".feels-like").innerText = "Ощущается как " + feels_like + "°C";
    document.querySelector(".humidity").innerText = "Влажность: " + humidity + "%";
    document.querySelector(".wind").innerText = "Скорость ветра: " + speed + " км/ч";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1900x960/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search__bar").value);
  },
};

document.querySelector(".search__button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search__bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Санкт Петербург");
