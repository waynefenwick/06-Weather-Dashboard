const srchCity = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityName'); // The name you type into the search bar

function k2f(K) {
     return Math.floor((K - 273.15) * 1.8 + 32);
 }

// Step 1: fetch city weather data and log it to the console
srchCity.addEventListener('click',
     function(event) {
     event.preventDefault(); // 1st step in the function is to prevent the page reset default
     const city = cityInput.value // the name of the city you typed in now = city...city is now in api
     const apiCityUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=d3fa28b2e5752dcd83a75fd76a5961c3';
     fetch(apiCityUrl) // 2nd step is to fetch the api information from openweathermap
     .then(function(response) { // then, respond to this fetch request by returning the requested data
          return response.json(); // the returned data will be json (JavaScript Object Notation--a Python) format of information
     })
     .then(function(data) { // then, console.log this data
          console.log(data);
          let apiName = document.querySelector('.cityName');
          apiName.textContent = data.name;

          let apiTemp = document.querySelector('.temp');
          apiTemp.textContent = data.temp;

          let apiWindSpd = document.querySelector('.windSpd');
          apiWindSpd.textContent = data.wind.speed;

          let apiWindDir = document.querySelector('.windDir');
          apiWindDir.textContent = data.wind.deg;
          

     })
     .catch(function (error) {// catch (make a note if there is) an error of some sort in retrieving the data
          console.log(error);
     });
});

// Step 2: Pull data from console log to div id=cityDetails
