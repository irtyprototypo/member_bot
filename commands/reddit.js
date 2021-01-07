
this.run = async (client, message, args) => {
	let fetch = require("node-fetch");
	let subReddit = "dankmemes";
	let count = 1;
	const regex = /\d/;
	const SPAMLIMIT = 20;

	// console.log("a: " + args[0]);

	if (args[0]){
		if(regex.test(args[0])){			// first arg is a digit	
			if(args[0] < SPAMLIMIT)
				count = args[0];
		}else{								// first arg should be the subreddit 
			switch(args[0]){
				case "lsc":
					subReddit = "latestagecapitalism";
					break;
				case "bs":
					subReddit = "battlestations";
					break;
				default:
					subReddit = args[0];
					break;
			}			
		}
		if(args[1] && args[1] < SPAMLIMIT)
			count = args[1];
	}

	// https://github.com/R3l3ntl3ss/Meme_Api
	let apiURL = "https://meme-api.herokuapp.com/gimme/" + subReddit + "/" + count;


	fetch(apiURL)
		.then( (response) => {
			return response.json();
		})
		.then( (data) => {
		// console.log(data + "\n----");
			for (var i in data.memes){
				// console.log("url: " + data.memes[i]["url"]);
				let memeURL = data.memes[i]["url"];
				if(args[0] === "dankmemes")
					message.send(memeURL);
				else
					message.channel.send(memeURL);
			}
		})
		.catch( (err) => {
			console.log("ERROR: " + err.message);
		});

};



