this.run = async (client, message, args) => {
	let data = '--- username ---\t:\t--- user id ---\n';
	message.guild.members.cache.forEach( (mem) => {
		// console.log(mem.user.username + ": " + mem.user.id);
		data += (mem.user.username + "\t:\t" + mem.user.id + "\n");
	});
	message.author.send(data);
	message.delete();
}