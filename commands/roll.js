
this.run = (client, message, args) => {
    let userMin, userMax;
    let min = 0;
    let max = 100;

    if(args[0] && !args[1]){
        userMax = parseInt(args[0]);
        
        if(!Number.isInteger(userMax)){
            message.channel.send(`Range must be a number`);
            return;
        }

        if(userMax < 0){
            message.channel.send(`Range must be positive.`);
            return;
        }
        
        max = userMax;
    }


    if(args[0] && args[1]){

        userMin = parseInt(args[0]);
        userMax = parseInt(args[1]);
        
        if(!Number.isInteger(userMin) || !Number.isInteger(userMax)){
            message.channel.send(`Range must be a number`);
            return;
        }

        if(userMin > userMax){
            message.channel.send(`Minimum must me larger than maximum.`);
            return;
        }

        if(userMin < 0 || userMax < 0){
            message.channel.send(`Range must be positive.`);
            return;
        }

    	min = userMin;
    	max = userMax;
    }

    let roll = Math.floor((Math.random() * max) + min);
    message.channel.send(`${message.author.username} rolled **${roll}** (${min}-${max})`);

};
