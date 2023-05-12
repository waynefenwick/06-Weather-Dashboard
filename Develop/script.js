const srchCity = document.querySelector('.srchBtn');
const sveCity = document.querySelector('.sveBtn');
const cityInput = document.getElementById('cityName');
const srchCityOfInterest = document.querySelector('#cityOfInterest');
let cityBtns;

// Retrieves data from local storage
window.addEventListener('load', () => {
     for (let i = 0; i < this.localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith(`savedCity_`)) {
               const savedCity = JSON.parse(localStorage.getItem(key));
               if (savedCity) {
                    getWeather(savedCity);
                    const cityInterest = document.querySelector('#cityOfInterest');
                    let foundCity = document.createElement('button');
                    foundCity.className = 'savedCityBtn';
                    foundCity.textContent = savedCity;
                    cityInterest.appendChild(foundCity);
               }
          }
     }
     cityBtns = document.querySelectorAll('.savedCityBtn');

     cityBtns.forEach(button => {
          button.addEventListener('click', (event) => {
               event.preventDefault();
               const city = button.textContent;
               getWeather(city);
          });
     });

});

// Converts wind data of degrees into directions
function degToDir(degrees) {
     const directions = ['N', 'NNW', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
          'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',];
     const index = Math.round(degrees / 22.5) % 16;
     return directions[index];
};

const timestamp = 1683895924;
const date = new Date(timestamp * 1000);
const dateString = date.toLocaleString();
console.log(dateString);


// Initiates getWeather function when the srchCity button is clicked
srchCity.addEventListener('click',
     (event) => {
          event.preventDefault();
          const city = cityInput.value;
          getWeather(city);
     }
);

// Initiates saving of city to local storage
sveCity.addEventListener('click',
     (event) => {
          event.preventDefault();

          const cityInterest = document.querySelector('#cityOfInterest');
          const savedCity = cityInput.value
          const timestamp = Date.now();
          const key = `savedCity_${timestamp}`;

          let foundCity = document.createElement('button');
          foundCity.className = 'savedCityBtn';
          foundCity.textContent = savedCity;
          cityInterest.appendChild(foundCity);

          foundCity.addEventListener('click', (event) => {
               event.preventDefault();
               getWeather(event.target.textContent);
          })
          localStorage.setItem(key, JSON.stringify(savedCity));
          cityInput.value = "";
     });

// Function that retrieves weather data from API
function getWeather(city) {
     const apiWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=d3fa28b2e5752dcd83a75fd76a5961c3&units=imperial';
     fetch(apiWeatherUrl)
          .then((response) => {
               return response.json();
          }
          )
          .then((data) => {
               console.log(data)
               let apiDate = document.querySelector('.date');
               apiDate.textContent = "Date: " + dateString;
               let apiName = document.querySelector('.cityName');
               apiName.textContent = "City: " + data.name;
               let apiTemp = document.querySelector('.temp');
               apiTemp.textContent = "Temperature: " + Math.floor(data.main.temp) + "°F";
               let apiHum = document.querySelector('.hum');
               apiHum.textContent = "Humidity: " + data.main.humidity + "%";
               let apiWindSpd = document.querySelector('.windSpd');
               apiWindSpd.textContent = "Wind Speed: " + Math.floor(data.wind.speed) + "mph";
               let apiWindDir = document.querySelector('.windDir');
               apiWindDir.textContent = "Wind Direction: " + degToDir(data.wind.deg);
          }
          )
          .catch((error) => {
               console.log(error);
          }
          )

     // Forecast weather
     const apiForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=d3fa28b2e5752dcd83a75fd76a5961c3&units=imperial'; // forecast url available; added city choice option
     fetch(apiForecastUrl)
          .then((response) => {
               return response.json();
          }
          )
          .then((data) => {
               console.log(data.list);

               for (let i = 0; i < 5; i++) {
                    let apiDay = document.querySelector('#threePmDay' + (i + 1) + 'Of5');
                    apiDay.innerHTML = '';
                    let date = document.createElement("p")
                    date.textContent = data.list[i * 8 + 5].dt_txt;
                    apiDay.appendChild(date);

                    let temp = document.createElement("p");
                    temp.textContent = "High: " + Math.floor(data.list[i * 8 + 5].main.temp) + "°F";
                    apiDay.appendChild(temp);

                    let humidity = document.createElement("p");
                    humidity.textContent = "Humidity: " + data.list[i * 8 + 5].main.humidity + "%";
                    apiDay.appendChild(humidity);

                    let windSpeed = document.createElement("p");
                    windSpeed.textContent = "Wind Spd: " + Math.floor(data.list[i * 8 + 5].wind.speed) + "mph";
                    apiDay.appendChild(windSpeed);

                    let windDir = document.createElement("p");
                    windDir.textContent = "Wind Dir: " + degToDir(data.list[i * 8 + 5].wind.deg);
                    apiDay.appendChild(windDir);
               };
          })
          .catch((error) => {
               console.log(error);
          }
          )
};

     // Weather Map - currently INOP
     // https://openweathermap.org/weathermap?basemap=map&cities=false&layer=precipitation&lat=30.9776&lon=-96.7896&zoom=9 - viewing the wetaher map on google shows this url
     // https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={API key} - weather api docs say use this url
     //{layer}	required	layer name
     //{z}	required	number of zoom level
     //{x}	required	number of x tile coordinate - lat=30.9776
     //{y}	required	number of y tile coordinate - lon=-96.7896
     //appid	required	Your unique API key (you can always find it on your account page under the "API key" tab)
     // Precipitation
     // layer : precipitation_new
     // area : worldwide

     // const apiGraphicUrl = 'https://api.openweathermap.org/data/2.5/precipitation_new?q=' + city + '&zoom=9&appid=d3fa28b2e5752dcd83a75fd76a5961c3&units=imperial';
     // fetch(apiGraphicUrl)
     //     .then(function(response) {
     //          return response.json();
     //     }
     //)
     //     .then(function(data) {
     //          console.log(data.list);
     //     }
     //)

// let apiDay = document.querySelector('#threePmDay' + (i + 1) + 'Of5'); // '#threePmDay' because you cannot use numbers for 1st character of an id or class
// apiDay.innerHTML = ''; // As a 1st step in the next search, resets the data values to nothing so on the next search, data is not added to existing data
// let date = document.createElement("p") // creates an element in which the temp data will be recorded
// date.textContent = data.list[i * 8 + 5].dt_txt; // textContent (the value that will appear) = the data value in the 5th array of the list and the main section and the temp value
// data.list for day1 started with 5, day2 was 13; day3 was 21
// here, the function takes i which is intially 0 * 8(= 0) + 5(=5)
// on the next loop i will be 1, therefore 1 * 8(= 8) + 5(=13)
// this is how the for loop with i works here
// apiDay.appendChild(date); // Attaches the retrieved value to the HTML element '#threePmDay1Of5'
                    // See script_2 for more details
                    // apiDay1-5, date1-5, temp1-5, himidity1-5, windSpeed1-5, WindDir1-5 each had there number
                    // the for loop is a function that enables the removal of those numbers with:
                    // i = 0: in coding the 1st number is always represented by 0, the 2nd by 1 etc
                    // i < 5: the highest number of repetitions will be 4 (0 thru 4 is 5 repititions)
                    // i++ after each repetition, 1 is added. So 0 will become 1; 1 will become 2 etc
                    // Result (using only apiDay to describe): apiDay1 would be the 1st cycle; apiDay2 the 2nd cycle....thru apiDay5
                    // The only differences between each of these lets were the numbers. This is why the 4 loop can be used