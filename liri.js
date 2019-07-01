require("dotenv").config();
var keys = require("./keys");

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
    order();
    break;
  case "spotify-this-song":
    music();
    break;
  default:
    console.log("No such value found.")
}

function movie() {
  var movieName = process.argv.slice(3).join(" ");

  // Then run a request with axios to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  // console.log(queryUrl);
 
  axios.get(queryUrl).then(
    function (response) {
//?????????????????????????

      // if (process.argv[3] === undefined){
      //   console.log("If you haven't watched 'Mr. Nobody', then you should. http://www.imdb.com/title/tt0485947/ It is on Netflix too!")
  //  process.argv[3] === "Mr. Nobody";
  //  console.log("Plot: " + response.data.Plot);
      // }

//?????????????????????????
// else
      console.log("Movie Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country Produced: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
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

// console.log(keys.spotify);
function music() {
  var musicName = process.argv.slice(3).join(" ");
  if (process.argv[3] === undefined){
    spotify.search({type: 'track', query: 'The Sign Ace of Base' }, function(err, data) {
    console.log("Artist(s): " + data.tracks.items[0].artists[0].name); //Artist(s)
    console.log("Song Name: " + data.tracks.items[0].name); //The song's name
    console.log("Preview Link: " + data.tracks.items[0].album.external_urls.spotify); //A preview link of the song from Spotify
    console.log("Album: " + data.tracks.items[0].album.name); //The album that the song is from
     })}
  else

    spotify.search({ type: 'track', query: musicName }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    // console.log(data.tracks.items[0]); 
    console.log("Artist(s): " + data.tracks.items[0].artists[0].name); //Artist(s)
    console.log("Song Name: " + data.tracks.items[0].name); //The song's name
    console.log("Preview Link: " + data.tracks.items[0].album.external_urls.spotify); //A preview link of the song from Spotify
    console.log("Album: " + data.tracks.items[0].album.name); //The album that the song is from
  });

function artist() {
  var band = process.argv.slice(3).join("");

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

//==========
//==========
function order() {
// Includes the FS package for reading and writing packages
var fs = require("fs");

// Running the readFile module that's inside of fs.
// Stores the read information into the variable "data"
fs.readFile("random.txt", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }

  // Break the string down by comma separation and store the contents into the output array.
  var output = data.split(",");

  // Loop Through the newly created output array
  for (var i = 0; i < output.length; i++) {

  // Print each element (item) of the array/
  console.log(output[i]);
  }
});
}
}
