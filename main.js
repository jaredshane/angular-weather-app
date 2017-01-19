angular
  .module('angularWeather', ['ngRoute'])
  .config(($routeProvider, $locationProvider) => {
    $locationProvider.hashPrefix('')
    $routeProvider
      .when('/', {
        controller: 'RootCtrl',
        templateUrl: 'partials/root.html'
      })
      .when('/weather/:zipcode', {
        controller: 'WeatherCutler',
        templateUrl: 'partials/weather.html'
      })
  })
  .controller('RootCtrl', function () {
    console.log("hey sup");
  })
