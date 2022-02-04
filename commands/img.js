this.run = async (client, message, args) => {
	let url = "./data/img/";
	let str = args.join(' ');

	if (str)
		url += str.toLowerCase() + ".png";
	else
		url += "medcine.png";

	message.channel.send("", {files: [url]});
};