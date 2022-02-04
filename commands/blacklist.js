const storage = require('node-persist');
const fs = require("fs");
let  blackList = [];
// const imretarded = ":365920769663959040:";
let file = './data/BlackList.txt';

this.run = async (client, message, args) => {
const imretarded = message.guild.emojis.cache.find(emoji => emoji.name === 'imretarded')

  // read data from file
  await fs.readFile(file, (error, datum) =>{
    if(error) throw err;

    let str = datum.toString();
    let splitted = str.split("\n");
    if(splitted[0] !== "")
      blackList = splitted;
  
  });


  if(!args[0])
    args[0] = "list";

  let digitRE = /\d/;
  let thingtodo = args;
  thingtodo = thingtodo.slice(1, thingtodo.length).join(" ");

  switch(args[0]){
    case "add":
      if(!digitRE.test(thingtodo[0])){                 // does it start with a digiit?
        message.channel.send("Invalid request.");
      }else if(blackList.indexOf(thingtodo) < 0){
        blackList.push(thingtodo);
        message.channel.send(thingtodo + " has been added to the Blacklist. :pencil2:");
      } else{
        message.channel.send(thingtodo + " is already on the Blacklist.");
        message.react(imretarded);
      }
      break;
    case "remove":
    case "rem":
      let pos = blackList.indexOf(thingtodo-1);
      if(!digitRE.test(thingtodo[0]-1))
        pos = thingtodo[0]-1;

      if (pos > -1){
        blackList.splice(pos, 1);
        let shiftedPos = (pos+1);
        shiftedPos = shiftedPos.toString();
        // console.log("----\nsp: " + shiftedPos);
        
        message.channel.send(thingtodo + " has been removed from the Blacklist.");
      }else{
        message.channel.send(thingtodo + " is not on the Blacklist.");
        message.react(imretarded);
      }
      break;
    case "clear":
      blackList = [];
      await fs.truncate(file, 0, (error) => {
        if(error) throw err;
      });
      message.channel.send("The Blacklist has been cleared. :gun:");
      break;
    default:
      if(blackList[0]){
        let title = ":memo:-- Blacklist --:memo:\n";
        message.channel.send(title + blackList.map( (item, index)  => `${index+1}. ${item}`).join("\n") + "\n");
      }else
        message.channel.send("The Blacklist is empty. :eyes:")
      break;
  }

  // write data to file
  if(blackList){
    blackList.forEach( async (item) =>{
      let noZero = (blackList.indexOf(item));
      noZero++;
      noZero = noZero.toString();
      
      let data = blackList.map( (item, index)  => `${item}`).join("\n");
      await fs.writeFile(file, data, (error)=>{
        if(error) throw err;
      });
    });
  }

};

