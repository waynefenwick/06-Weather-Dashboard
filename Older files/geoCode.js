fetch(apiGeoCode) // 2nd step is to fetch the api information from openweathermap
     .then(function(response) { // then, respond to this fetch request by returning the requested data
          return response.json(); // the returned data will be json (JavaScript Object Notation--a Python) format of information
     })
     .then(function(geoCodeData) {
          const lat = geoCodeData.latitude;
          const lon = geoCodeData.longitude;

          const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + 'lon=' + lon + '&appid=d3fa28b2e5752dcd83a75fd76a5961c3';
          fetch(weatherUrl)
               .then(function(resp){
                    return resp.json()
               })
               .then(function(weatherInfo) {
                    // extract the data you want
                    // put that data on the screen
               })
     })