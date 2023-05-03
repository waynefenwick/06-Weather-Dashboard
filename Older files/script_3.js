// Below are codes provide by weather api to retrieve current and forecast weather data - not working yet
window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = []; // 8 day forecast
window.myWidgetParam.push({
     id: 11,
     cityid: '4682991', // cityid needs to = "city = cityInput.value" to retrive city of choice
     appid: 'd3fa28b2e5752dcd83a75fd76a5961c3',
     units: 'metric',
     containerid: 'openweathermap-widget-11',
     });
     (function() {
          var script = document.createElement('script');
          script.async = true;
          script.charset = "utf-8";
          script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(script, s);
     })();

window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = []; // Current Conditions
window.myWidgetParam.push({
     id: 15,
     cityid: '4682991',// cityid needs to = "city = cityInput.value" to retrive city of choice
     appid: 'd3fa28b2e5752dcd83a75fd76a5961c3',
     units: 'metric',
     containerid: 'openweathermap-widget-15',
});  
     (function() {
          var script = document.createElement('script');
          script.async = true;
          script.charset = "utf-8";
          script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(script, s);
     })();

// <div id="openweathermap-widget-11"></div>
// <script src='//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/d3.min.js'></script>
// <script>window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  window.myWidgetParam.push({id: 11,cityid: '4682991',appid: 'd3fa28b2e5752dcd83a75fd76a5961c3',units: 'metric',containerid: 'openweathermap-widget-11',  });  (function() {var script = document.createElement('script');script.async = true;script.charset = "utf-8";script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();</script>

// <div id="openweathermap-widget-15"></div>
// <script>window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  window.myWidgetParam.push({id: 15,cityid: '4682991',appid: 'd3fa28b2e5752dcd83a75fd76a5961c3',units: 'metric',containerid: 'openweathermap-widget-15',  });  (function() {var script = document.createElement('script');script.async = true;script.charset = "utf-8";script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();</script>