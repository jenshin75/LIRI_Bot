require("dotenv").config();
var keys = require("./keys");
// var fs = require("fs");

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var bandsintown = require('bandsintown');  
var moment = require('moment');

// Grab the movieName which will always be the third node argument.
var action = process.argv[2];

switch (action) {
  case "movie-this":
    movie();
    break;
  case "concert-this":
    artist();
    break;
  case "do-what-it-says":
    task();
    break;
  case "spotify-this-song":
    music();
    break;
  default:
    console.log("No such value found.")
}





function artist() {                       
  var band = process.argv.slice(3).join(" ");

  // Then run a request with axios to the OMDB API with the movie specified
  var queryUrl = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";

  // This line is just to help us debug against the actual URL.
  // console.log(queryUrl);

  axios.get(queryUrl).then(
    function (response) {
      console.log("Venue Name: " + response.data[0].venue.name);
      console.log("Venue Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
      console.log("Venue Date: " + response.data[0].datetime);
      var dateRev = moment(response.data[0].datetime).format('L');
      console.log("Venue Date (MM/DD/YYYY): " + dateRev);
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}





function task() {
  // Includes the FS package for reading and writing packages
  var fs = require("fs");

  // Running the readFile module that's inside of fs.
  // Stores the read information into the variable "data"
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
  
    // Break the string down by comma separation and store the contents into the output array.
    var output = data.split(",");

    // Loop Through the newly created output array
    for (var i = 0; i < output.length; i++) {
      // Print each element (item) of the array
      // console.log(output[i]);
  }
  var item1 = (output[0]);
  var item2 = (output[1]);
  console.log("node liri.js " + item1 + " " + item2);


}
);
}

