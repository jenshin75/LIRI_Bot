require("dotenv").config();
var keys = require("./keys");

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// Grab the movieName which will always be the third node argument.
var action = process.argv[2];
//***var value = process.argv[3];

switch (action) {
  case "movie-this":
    responseMovie();
    break;
  case "concert-this":
    responseConcert();
    break;
  case "spotify-this-song":
    responseMusic();
    break;
  default: 
    console.log("liri doesn't know...")
}

function responseMovie() {
  var movieName = process.argv[3];
  // Then run a request with axios to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);

  axios.get(queryUrl).then(
    function (response) {
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
function responseMusic() {
  var musicName = process.argv[3];

  // spotify.search({type: 'track', query: 'All the Small Things' }, function(err, data) {
  spotify.search({type: 'track', query: musicName}, function(err, data) {  
     if (err) {
      return console.log('Error occurred: ' + err);
    }
// console.log(data.tracks.items[0]); 

console.log(data.tracks.items[0].artists[0].name); //Artist(s)
console.log(data.tracks.items[0].name); //The song's name
console.log(data.tracks.items[0].album.external_urls.spotify); //A preview link of the song from Spotify
console.log(data.tracks.items[0].album.name); //The album that the song is from

 });
}
