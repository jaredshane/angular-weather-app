angular
  .module('angularWeather', ['ngRoute'])
  .config(($routeProvider, $locationProvider  ) => {
    $locationProvider.hashPrefix('')

    //   // Initialize Firebase
    firebase.initializeApp({
        apiKey: "AIzaSyCxSJqs1vcTVavq_1Fj9lyQ5Sez3CD69IQ",
        authDomain: "fir-auth-test-e9184.firebaseapp.com",
        databaseURL: "https://fir-auth-test-e9184.firebaseio.com",
        storageBucket: "fir-auth-test-e9184.appspot.com",
        messagingSenderId: "537431521876"
      });

      const checkForAuth = {
        checkForAuth: function($location) {
          //http://stackoverflow.com/questions/37370224/firebase-stop-listening-onauthstatechanged
           const authReady = firebase.auth().onAuthStateChanged(user => {
             authReady()
            if (!user) {
              $location.url('/')
            }
          }) //authReady

        }
      } //checkForAuth


    $routeProvider
      .when('/', {
        controller: 'RootCtrl',
        templateUrl: 'partials/root.html'
      })
      .when('/weather/:zipcode', {
        controller: 'WeatherCtrl',
        templateUrl: 'partials/weather.html',
        resolve: checkForAuth
      })
  })
  .controller('RootCtrl', function ($scope, $location) {
    $scope.goToWeather = () => {
      //chnage the URL
      // location.href = `/#/weather/${$scope.zip}`
      $location.url(`/weather/${$scope.zip}`)
    }
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
  .factory('authFactory', function () {
    return {
      login (email, password) {
        firebase.signInWIthEmailandPassword(email, password)
      },

      getUserId() {
        return firebase.auth().currentUser.uid
      }
    }
  })
