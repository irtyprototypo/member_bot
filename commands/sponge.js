
this.run = (client, message, args) => {
	let str = args.join(' ');
	if(!str)
		return;

	let res = spongify(str);
    message.channel.send(res, {files: ['./data/img/mock.png']});

};


function spongify(text){
    let str = text.toLowerCase();
    for (var i = 0; i < str.length; i++) {
        let rand = Math.floor(Math.random() * (100 - 0));
        if(str.charAt(i) !== ' ' && rand%2 == 0 )
            str = setCharAt(str,i,str.charAt(i).toUpperCase());
    };
    return str;
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}