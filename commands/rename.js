let min = 0;
let max = 5;
let deathRound = Math.floor((Math.random() * max) + min);	
let currentRound = Math.floor((Math.random() * max) + min);
this.run = (client, message, args) => {

	switch(args[1]){
		case 'reload':
	    message.channel.send(`${message.author.username} has reloaded the revolver. ${max} rounds are in the cylinder.`);
			return;
		case 'spin':
			currentRound = Math.floor((Math.random() * max) + min);
			return;
	}

    if(currentRound == deathRound){
	    message.channel.send(`${message.author.username} shot himself in the head 🔫. He is dead. The revolver has been reloaded.`);
    	currentRound = 0;
			deathRound = Math.floor((Math.random() * max) + min);	
    } else{
	    message.channel.send(`Click! ${message.author.username} is alive. 😌`);
    	currentRound = (currentRound + 1) % 6;
    }

    console.log(`c: ${currentRound}, d: ${deathRound}`);
};
