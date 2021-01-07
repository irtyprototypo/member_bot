// const rp = require('request-promise');
// const cheerio = require('cheerio');
const fetch = require("node-fetch");
const config = require("../config.json");
const TwitterCrawler = require('twitter-crawler');
const fs = require("fs");

const options = {
    uri: 'http://www.trumptwitterarchive.com/archive',
    transform: (body) => {
        return cheerio.load(body);
    },
};

const credentials = [
  {
    consumer_key: config.twitterAPIKey,
    consumer_secret: config.twitterAPIKeySec,
    access_token_key: config.twitterAToken,
    access_token_secret: config.twitterATokenSec,
  }
]
const crawler = new TwitterCrawler(credentials);

const apiURL = "https://www.trumptweets.rest/api";
const twits = ['DeepLeffen', 'realDonaldTrump', 'RealJamesWoods'];


this.run = async function run (client, message, args) {
  
  let twitterHandle;

  let who = args.toString();
  switch(who.toLowerCase()){
    // james woods
    case "realjameswoods":
    case "real james woods":
    case "jameswoods":
    case "james woods":
    case "rjw":
    case "jw":
      twitterHandle = "RealJamesWoods";
      getFromTwitter();
      break;
    
    // deep leffen
    case "deep":
    case "deepleffen":
    case "dl":
    case "lef":
    case "leff":
    case "leffen":
      twitterHandle = "DeepLeffen";
      getFromTwitter();
      break;
		
		// trump
    case "old":
    case "past":
    case "trump old":
    	twitterHandle = "realDonaldTrump"
      getFromDataBase();
      break;
    case "now":
    case "trump":
    case "potus":
    	twitterHandle = "realDonaldTrump"
      getFromTwitter();
      break;

    // random
    case "":
    	let rand = Math.floor((Math.random() * 100)) % twits.length;
    	twitterHandle = twits[rand];
      getFromTwitter();
      break;
    default:
      twitterHandle = who;
      getFromTwitter();
      break;
  }

  let tweetURL = "https://twitter.com/" + twitterHandle + "/status/";


  async function getFromTwitter(){
    crawler.getTweets(twitterHandle, {limit: 1})
      .then((tweets) => {
        let suffix = tweets[0]['id_str']; 
        tweetURL += suffix;

        let tweetDate = tweets[0]['created_at'];
        year = tweetDate.substr(26, 29);
        month = tweetDate.substr(4, 6);
        // time = tweetDate.substr(11, 5);
        tweetDate = month + " " + year;
        message.channel.send(tweetURL + " Date: " + tweetDate);

      })
      .catch( (err) => {
        console.log("ERROR: " + err.message + ". in !tweet");
        run(client, message, args);
      });
  }


  async function getFromDataBase(){
    fetch(apiURL)
      .then( (response) => {
        return response.json();
      })
      .then( (data) => {
        tweetURL+=data.id_str;
        let tweetDate = data.created_at;
        tweetDate = tweetDate.substr(0, 10);
        message.channel.send(tweetURL + " Date: " + tweetDate);
      })
      .catch( (err) => {
       console.log("ERROR: " + err.message + ". in !tweet");
      });
  }
};
