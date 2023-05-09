const srchCity = document.querySelector('.srchBtn');
const sveCity = document.querySelector('.sveBtn');
const cityInput = document.getElementById('cityName'); // The name you type into the search bar
const srchCityOfInterest = document.querySelector('#cityOfInterest');

// Retrieve data from local storage
window.addEventListener('load', function () { // window = window of browser. NOTE:  ', function() { '  can also be written like this: ', () => {
          const savedCity = JSON.parse(localStorage.getItem('savedCity')); 
          if (savedCity) { // if there is a saved city...
          getWeather(savedCity);//...runs the getWeather function

          const cityInterest = document.querySelector('#cityOfInterest');//...runs the same function as in sveCity.addEventListener function
          let foundCity = document.createElement('button');
          foundCity.id = 'savedCityBtn';
          
          foundCity.textContent = savedCity;
          cityInterest.appendChild(foundCity);
          }
     }
);

// Convert function for wind direction
function degToDir(degrees) {
     const directions = ['N', 'NNW', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',];
     const index = Math.round(degrees / 22.5) % 16; // % is modulous operator
     return directions[index];
}

// Get weather data from API and pull data into JS
srchCity.addEventListener('click', // On click, the function starts
     function(event) {
     event.preventDefault(); // 1st step in the function is to prevent the page reset default
     const city = cityInput.value // the name of the city you typed in now = city...city is now in api
     getWeather(city) // When you click, you are starting this function to get the weather for the city you you typed in
     }
);

// Save city to local storage
sveCity.addEventListener('click',
     function(event) {
     event.preventDefault(); // 1st step in the function is to prevent the page reset default
     
     const cityInterest = document.querySelector('#cityOfInterest');
     const savedCity = cityInput.value
     
     
     
     
     let foundCity = document.createElement('button');
     foundCity.id = 'savedCityBtn';
     foundCity.textContent = savedCity;
     cityInterest.appendChild(foundCity)

     localStorage.setItem('savedCity', JSON.stringify(savedCity)); // stringyfy
     cityInput.value = "";
     renderMessage();
     console.log("message rendered");
     }
);

// Search for Saved City
srchCityOfInterest.addEventListener('click', // On click, the function starts
     function(event) {
     event.preventDefault(); // 1st step in the function is to prevent the page reset default
     const city = srchCityOfInterest.textContent // the name of the city you typed in now = city...city is now in api 
     console.log(srchCityOfInterest.textContent)
     getWeather(city)   
     }
);

function getWeather(city) {
     const apiWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=d3fa28b2e5752dcd83a75fd76a5961c3&units=imperial'; // weather for current conditions url available; added city choice option
     fetch(apiWeatherUrl) // 2nd step is to fetch the api information from openweathermap
          .then(function(response) { // then, respond to this fetch request by returning the requested data
               return response.json(); // the returned data will be json (JavaScript Object Notation--a Python) format of information
          }
     )
          .then(function(data) { // then, console.log this data
               //console.log(data);

               let apiName = document.querySelector('.cityName'); // apiName grabs the document cityName id
               apiName.textContent = "City: " + data.name; // The text content of cityName that = the "data" retrieved that has the id of "name"

               let apiTemp = document.querySelector('.temp');
               apiTemp.textContent = "Temperature: " + Math.floor(data.main.temp) + "°F"; // "data" retrieved that = id of main then "temp" under main

               let apiHum = document.querySelector('.hum');
               apiHum.textContent = "Humidity: " + data.main.humidity + "%"; // "data" retrieved that = id of main then "humidity" under main

               let apiWindSpd = document.querySelector('.windSpd');
               apiWindSpd.textContent = "Wind Speed: " + Math.floor(data.wind.speed) + "mph";

               let apiWindDir = document.querySelector('.windDir');
               apiWindDir.textContent = "Wind Direction: " + degToDir(data.wind.deg); // Applies the "function degToDir" to data.wind.deg

               // extract the icon code
               // add it to one of the img urls
               // insert that image url into the src attr of an html img el
               // use string concatenation w/ plus signs
               // ex "the best " + food  + "!" 
          }
     )
          .catch(function (error) { // catch (make a note if there is) an error of some sort in retrieving the data
               console.log(error);
          }
     )

     // Current Weather Graphic
     const apiGraphicUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=d3fa28b2e5752dcd83a75fd76a5961c3&units=imperial'; // forecast url available; added city choice option
     fetch(apiGraphicUrl)
          .then(function(response) {
               return response.json();
          }
     )
          .then(function(data) {
               console.log(data.list);
          }
     )

     const apiForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=d3fa28b2e5752dcd83a75fd76a5961c3&units=imperial'; // forecast url available; added city choice option
     fetch(apiForecastUrl)
          .then(function(response) {
               return response.json();
          }
     )
          .then(function(data) {// Retrieves data
               console.log(data.list); //Can also console.log(data.list[8].main.temp) for eg. helps filter out data for which you are looking
               
               // Day 1
               let apiDay1 = document.querySelector('#threePmDay1Of5'); // dont use numbers for 1st character
               apiDay1.innerHTML = ''; // As a 1st step in the next search, resets the data values to nothing so on the next search, data is not added to existing data
               let date1 = document.createElement("p") // creates an element in which the temp data will be recorded
               date1.textContent = data.list[5].dt_txt; // textContent (the value that will appear) = the data value in the 8th array of the list and the main section and the temp value 
               apiDay1.appendChild(date1) // Attaches the retrieved value to the HTML element '#threePmDay1Of5'
               
               let temp1 = document.createElement("p") // creates an element in which the temp data will be recorded
               temp1.textContent = "High: " + Math.floor(data.list[5].main.temp) + "°F"; // textContent (the value that will appear) = the data value in the 8th array of the list and the main section and the temp value 
               apiDay1.appendChild(temp1) // Attaches the retrieved value to the HTML element '#threePmDay1Of5'

               let humidity1 = document.createElement("p")
               humidity1.textContent = "Humidity: " + data.list[5].main.humidity  + "%";
               apiDay1.appendChild(humidity1)

               let windSpeed1 = document.createElement("p")
               windSpeed1.textContent = "Wind Spd: " + Math.floor(data.list[5].wind.speed) + "mph";
               apiDay1.appendChild(windSpeed1)

               let windDir1 = document.createElement("p")
               windDir1.textContent = "Wind Dir: " + degToDir(data.list[5].wind.deg);
               apiDay1.appendChild(windDir1)

               // Day 2
               let apiDay2 = document.querySelector('#threePmDay2Of5');
               apiDay2.innerHTML = '';
               let date2 = document.createElement("p");
               date2.textContent = data.list[13].dt_txt;
               apiDay2.appendChild(date2)
               //apiDay2.appendChild("<h1>Hellow</h1>")
               
               let temp2 = document.createElement("p")
               temp2.textContent = "High: " + Math.floor(data.list[13].main.temp) + "°F";
               apiDay2.appendChild(temp2)

               let humidity2 = document.createElement("p")
               humidity2.textContent = "Humidity: " + data.list[13].main.humidity + "%";
               apiDay2.appendChild(humidity2)

               let windSpeed2 = document.createElement("p")
               windSpeed2.textContent = "Wind Spd: " + Math.floor(data.list[13].wind.speed) + "mph";
               apiDay2.appendChild(windSpeed2)

               let windDir2 = document.createElement("p")
               windDir2.textContent = "Wind Dir: " + degToDir(data.list[13].wind.deg);
               apiDay2.appendChild(windDir2)
               
               // Day 3
               let apiDay3 = document.querySelector('#threePmDay3Of5');
               apiDay3.innerHTML = '';
               let date3 = document.createElement("p");
               date3.textContent = data.list[21].dt_txt;
               apiDay3.appendChild(date3)
               
               let temp3 = document.createElement("p")
               temp3.textContent = "High: " + Math.floor(data.list[21].main.temp) + "°F";
               apiDay3.appendChild(temp3)

               let humidity3 = document.createElement("p")
               humidity3.textContent = "Humidity: " + data.list[21].main.humidity + "%";
               apiDay3.appendChild(humidity3)

               let windSpeed3 = document.createElement("p")
               windSpeed3.textContent = "Wind Spd: " + Math.floor(data.list[21].wind.speed) + "mph";
               apiDay3.appendChild(windSpeed3)

               let windDir3 = document.createElement("p")
               windDir3.textContent = "Wind Dir: " + degToDir(data.list[21].wind.deg);
               apiDay3.appendChild(windDir3)

               // Day 4
               let apiDay4 = document.querySelector('#threePmDay4Of5');
               apiDay4.innerHTML = '';
               let date4 = document.createElement("p");
               date4.textContent = data.list[29].dt_txt;
               apiDay4.appendChild(date4)

               let temp4 = document.createElement("p")
               temp4.textContent = "High: " + Math.floor(data.list[29].main.temp) + "°F";
               apiDay4.appendChild(temp4)

               let humidity4 = document.createElement("p")
               humidity4.textContent = "Humidity: " + data.list[29].main.humidity + "%";
               apiDay4.appendChild(humidity4)

               let windSpeed4 = document.createElement("p")
               windSpeed4.textContent = "Wind Spd: " + Math.floor(data.list[29].wind.speed) + "mph";
               apiDay4.appendChild(windSpeed4)

               let windDir4 = document.createElement("p")
               windDir4.textContent = "Wind Dir: " + degToDir(data.list[31].wind.deg);
               apiDay4.appendChild(windDir4)

               // Day 5
               let apiDay5 = document.querySelector('#threePmDay5Of5');
               apiDay5.innerHTML = '';
               let date5 = document.createElement("p");
               date5.textContent = data.list[37].dt_txt;
               apiDay5.appendChild(date5)

               let temp5 = document.createElement("p")
               temp5.textContent = "High: " + Math.floor(data.list[37].main.temp) + "°F";
               apiDay5.appendChild(temp5)

               let humidity5 = document.createElement("p")
               humidity5.textContent = "Humidity: " + data.list[37].main.humidity + "%";
               apiDay5.appendChild(humidity5)

               let windSpeed5 = document.createElement("p")
               windSpeed5.textContent = "Wind Spd: " + Math.floor(data.list[37].wind.speed) + "mph";
               apiDay5.appendChild(windSpeed5)

               let windDir5 = document.createElement("p")
               windDir5.textContent = "Wind Dir: " + degToDir(data.list[37].wind.deg);
               apiDay5.appendChild(windDir5)
          }
     )     
          .catch(function (error) {
               console.log(error);
          }
     );
};

// https://openweathermap.org/img/wn/' + 10 + 'd@2x.png (for graphic clipart: https://openweathermap.org/weather-conditions)
// https://openweathermap.org/img/wn/10d@2x.png - replace ' + 10 + ' with the ' + icon + ' ....same function as you used for  city in api 
// You will then create a let for icon to = c how you did it using city

// Step 3-a: Retrieve local storage data into the cityOfInterest ids
// Step 3-b: addEventListner to fetch selected city data from API
//           function should be very similar to Step 1 

// data type that holds a collection--set up an array
// for loop: increment by 8 because data is every 8 times
