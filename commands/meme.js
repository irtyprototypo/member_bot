// const nym = require("nodeyourmeme");
const KYM = require('shitty-memes')
const kym = new KYM()
 

this.run = async (client, message, args) => {

	let str = args.join(' ');
	if(!str)
		str = 'random';

		kym.search(str)
			.then( (item) =>{
				// console.log(item);
				if(!item)
					throw new Error('No results found.'); 

				let rand = Math.floor(Math.random() * ((item.length-1)+1) );
				console.log("Choosing meme (" + str + ") " + rand + " out of " + item.length);
				message.channel.send(item[rand]);
			})
			.catch( (err) => {
				// console.log(err.message);
				message.channel.send(err.message);
			});
};



