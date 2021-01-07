this.run = async (client, message, args) => {
  let fetch = require("node-fetch");
  let api_url = "https://blockchain.info/ticker";
  let currency = new String(args[0]).toUpperCase();

  fetch(api_url)
    .then( response => { return response.json(); })
    .then( data => {
      // console.log(data);
      if(!args[0])
        currency = "USD";

      let denomination = data[currency];
      let formattedResult = (denomination.buy).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

      // console.log("Current price per bitcoin: $" + formattedResult + " (" + currency + ").");
      message.channel.send("Current price per bitcoin: $" + formattedResult + " (" + currency + ").");
    })
    .catch( err => { console.log("ERROR: " + err.message); });
};
