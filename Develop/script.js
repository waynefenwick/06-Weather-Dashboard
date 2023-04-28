const searchBtn = document.querySelector('searchBtn');
const getWeatherApi = document.querySelector('weatherApi');
const cityName = document.querySelector('citySearch');
const cityDetails = document.querySelector('cityDetails');
//const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=conroe&appid=d3fa28b2e5752dcd83a75fd76a5961c3';


// Step 2-1: Search for a city via API -- not working!!
const srchCity = document.getElementById('searchBtn');

srchCity.addEventListener('click',
     function(event) {
     event.preventDefault();
     fetch(apiCityUrl)
     .then(function(response) {
          return response.json();
     })
     .then(function(data) {
          console.log(data);
     })
     .catch(function (error) {
          console.log(error);
     });
});


// Step 2-2: Search for a city via API
document.getElementById('searchBtn').addEventListener('click', searchForCity);

function searchForCity(event) { 
     event.preventDefault();
     let city = document.getElementById('citySearch').value;// value = city name you enter into the search bar
     let apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=d3fa28b2e5752dcd83a75fd76a5961c3';
     fetch(apiUrl)
     .then(function (response) {
          if (response.status === 200) {
               return response.json();
          } else {
               throw new Error('City not found, try again');
          }
     })
     .then(function (data) {
          console.log(data);
     })
     .catch(function (error) {
          console.log(error);
     });
}

// Step 2b: Search for a city via api
function citySearch(ApiUrl) {
     fetch(ApiUrl)
          .then(function (response) {
          return response.json();
          })
          .then(function (data) {
          console.log(data);
          })
     if (response.status === 200) {
          let responseText = document.getElementById('responseText');
               if (responseText !== null) {
          responseText.textContent = response.status;
          }
     } else {
          alert('City not found, try again');
          //reset search bar
          // user enters another city name
          // search button is clicked
     }
     return response.json();
     };


// You need to create a function now that takes console.log data and populates id=cityDetails
// You also need to create a function that saves the found city to the cityOfInterest list

//document.getElementById('cityDetails').innerHTML[0].description;

// In HTML the button has id="searchCity". When you click this button (onclick), 
// you want to start a function that will search for the city you
// entered in the search bar. So, you need to created a function called searchForCity
// The purpose of this function is to search for the city.
// Question: What is the first step you need to take?
// Answer: Initialize a function that will search for a city.
// Action Step: create "function searchForCity"
// Question: Where do you want to search for the city?
// Answer: in my openweathermap api that is setup.
// Action Step: Access to this openweathermap api must be established
     // Question: How will you do this?
     // Answer: ???
// Question: What city are you searching for?
// Answer: There are a variety of cities I would like to seardh for
     // Question: How will this be done?
     // Answer: replace the city name (conroe) in your http api 
// Action Step: Replace ...conroe... with ...' + city + '...
// Question: How will the button activate a searh for the city you enter in the search bar?
// Answer: an action item needs to be added to the function
// What is this action item?
// Answer: when the button is clicked, it activates the search function
     //NOTE: the function is activated by this click code.
     //The code is not part of the function, but an item that initializes the function
     // Another way to put it: when you click the search button, you want it to activate the function

// Step 4: Retrieve current weather data
function currentCondtions() {
     
//   -- populate current weather data for city found, to "id=cityDetails"
//   -- populate forecast weather data for city found, to "id=cityForecast"
     
}
     
     // Step 5: Retrieve forecast weather data
     function forecastConditions () {
          
     }


// Step 3: Or, select a saved city
function citySelect (event) {// Click on a saved city to fire "function cityData"
     event.preventDefault()
     cityOfInterest.addEventListner('click', cityData);
//   There can be up to 8 cityOfInterest possibilities
//   How will cityData know to display the data of the selected city?    
}


// Step 5: Update selected city's data hourly
function weatherUpdate () {
     //   -- updates selected city's "id-cityDetails" on the hour
     //   -- updates selected city's "id=cityForecast" on the hour
     //setInterval(function () {
     //     weatherUpdate();
     //   }, 60 * 60 * 1000); // Run the function every hour
     
}

// Step 6: Save to local storage if necessary
function saveToLocalStorage () {

}


// Step 1: When page loads, retrieve data from local storage
function renderLocalStorage() {
     let cityList = JSON.parse(localStorage.getItem("savedCities)"));
          if (cityList !== null) {
               document.querySelector
          }
     //     if // there is data, retrieve it
     //      else // ignore it
     }

     function k2f(K) {
          return Math.floor((K - 273.15) * 1.8 + 32);
      }