
this.run = (client, message, args) => {
	let num = message.id;
	let last = num.slice(num.length-1, num.length);
	let dub = num.slice(num.length-2, num.length-1);
	let trip = num.slice(num.length-3, num.length-2);
  let pog = message.guild.emojis.cache.find(emoji => emoji.name === 'pogchamp');
  message.channel.send(`${message.author.username} :point_right: ${num}`).then( sentMessage => {
  	if((trip + dub + last) == '420')
    	sentMessage.react('🌲');

    if((dub + last) == '69'){
    	sentMessage.react('🇳');
    	sentMessage.react('🇮');
    	sentMessage.react('🇨');
    	sentMessage.react('🇪');
    }

    if(last == dub)
    	sentMessage.react(pog);

	  if(last == dub && dub == trip){
	    sentMessage.react(pog);
	    sentMessage.react(pog);
	    sentMessage.react(pog);
	  }
  });
};
