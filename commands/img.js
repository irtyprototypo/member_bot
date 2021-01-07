this.run = async (client, message, args) => {
	let url = "./data/img/";
	let str = args.join(' ');
	
	url = str ? str.toLowerCase() + ".png" : "medcine.png";

	message.channel.send("", {files: [url]});
};