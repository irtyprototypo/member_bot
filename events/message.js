const fs = require('fs');

module.exports = async (client, message) => {
  // from a bot
  if (message.author.bot)
    return;
 

  let mem = message.content.toLowerCase();
  // soft command
  if(mem.includes("member"))
    message.react(message.guild.emojis.cache.find(emoji => emoji.name === 'member'));           // member berry       700699306776330260
  
  let re = /^\>+ *[a-z]+/;
  if(re.test(mem) || mem.includes("implying"))
    message.react(message.guild.emojis.cache.find(emoji => emoji.name === 'implying'));         // implying constanza 614253196453347338

  if(mem.includes("imagin") || mem.includes("think") || mem.includes(":thinking:") || mem.includes("🤔"))
    setTimeout(_=>{message.react("🤔");}, 9 * 1000)				// imagining

  // no prefix
  if (message.content.indexOf(client.config.prefix) !== 0)
    if (message.channel.name.includes("bot-spam"))
      client.commands.get('checkem').run(client, message, null);
    // return;


  let exit = false;
  // read data from file
  fs.readFile('./BlackList.txt', (error, datum) =>{
    if(error) throw error;

    let str = datum.toString();
    let splitted = str.split("\n");
    splitted.forEach( (dada) => {
      // console.log("dad: " + dada);
      // murf:  115942462131929093
      // cacio: 709522193742299217
      if(message.member.id == dada){
        exit = true;
        return;
      }
    });
  });


  
  // timeout for sync issues.
  setTimeout(()=>{

    // hard command alteration
    let args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    // confirm hard command exists
    let cmd = client.commands.get(command);
    if (!cmd)
      return;

    // ignorelist check
    if(exit){
      message.react(message.guild.emojis.cache.find(emoji => emoji.name === 'LUL'));
      return;
    }

    // execute hard command
    cmd.run(client, message, args);
  }, 5);

};