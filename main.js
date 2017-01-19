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
        controller: 'WeatherCtrl',
        templateUrl: 'partials/weather.html'
      })
  })
  .controller('RootCtrl', function ($scope, $location) {
    $scope.goToWeather = () => {
      //chnage the URL
      // location.href = `/#/weather/${$scope.zip}`
      $location.url(`/weather/${$scope.zip}`)
    }
    console.log("hey sup");
  })
  .controller('WeatherCtrl', function ($routeParams, $scope, weatherFactory) {
    weatherFactory
      .getWeather($routeParams.zipcode)
      .then((weather) => {
        $scope.temperature = weather.temp
        $scope.city = weather.city
        $scope.icon = weather.icon
      })
    // console.log('hey dis da weather')
  }).factory('weatherFactory', ($http) => {
      return {
        getWeather(zipcode) {
          return $http
            .get(`http://api.wunderground.com/api/33539797879b6485/conditions/q/${zipcode}.json`)
            .then((response)=> {
              console.log(response)
              return {
                  temp: response.data.current_observation.temp_f,
                  city: response.data.current_observation.display_location.full,
                  icon: response.data.current_observation.icon_url
              }
            })
        }
      }
  })
