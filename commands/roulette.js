let min = 0;
let max = 5;
let deathRound = Math.floor((Math.random() * max) + min);	
let currentRound = Math.floor((Math.random() * max) + min);
this.run = (client, message, args) => {

  console.log(`c: ${currentRound}, d: ${deathRound}`);

	switch(args[0]){
		case 'spin':
			currentRound = Math.floor((Math.random() * max) + min);
			message.channel.send(`${message.author.username} has spun the cylinder.`);
			return;
		default:
			if(currentRound == deathRound){
				message.channel.send(`${message.author.username} shot himself in the head 🔫. He is dead. The revolver has been reloaded.`);
				currentRound = 0;
				deathRound = Math.floor((Math.random() * max) + min);	
			} else{
				message.channel.send(`Click! ${message.author.username} is alive. 😌`);
				currentRound = (currentRound + 1) % 6;
			}
			return;
	}
};
