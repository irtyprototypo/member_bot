this.run = async (client, message, args) => {
  let fetch = require("node-fetch");
  let search_term = args.join(" ");
  let apikey = "LIVDSRZULELA";
  let numOfImages = 1;
  let api_url = "https://api.tenor.com/v1/search?q=" + search_term + "&key=" + apikey + "&limit=" + numOfImages;


  fetch(api_url)
    .then( (response) => {
      return response.json();
    })
    .then( (data) => {
      // console.log(data);
      message.channel.send(data["results"][0]["url"]);
    })
    .catch( (err) => {
      console.log("ERROR: " + err.message);
    });
};
