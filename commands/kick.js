this.run = async (client, message, args) => {
	let user = args.toString().substring(3, 21);
	let kickReason = args.slice(1).join(' ');

	if (!args[0])
		await message.member.kick()
			.then(()=>{
				message.channel.send(message.member.displayName + " kicked himself 😂");
			})
			.catch( (err) => {
	       		console.log("ERROR: " + err.message + ". in !kick");
			});

	user = message.mentions.users.get(user);
	// console.log(user);
	if(user)
		await message.guild.member(user).kick({days: 1, reason: kickReason})
			.then(()=>{
				console.log("Kicked " + user + ": " + kickReason)	
				message.channel.send(message.member.displayName + " kicked " + user.username);
			})
			.catch( (err) => {
		       console.log("ERROR: " + err.message + ". in !kick");
			});

}