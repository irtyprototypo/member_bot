this.run = async (client, message, args) => {
	message.guild.fetchBans()
		.then( (bans) => {
			bans.forEach((member) =>{
				// console.log(member.user);
				message.channel.send(member.user.username + ": " + member.reason);
			})
		});
}