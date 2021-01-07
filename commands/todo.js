const fs = require("fs");
let  todoList = [];
// const imretarded = ":365920769663959040:";
let file = './data/ToDoList.txt';

this.run = async (client, message, args) => {
const imretarded = message.guild.emojis.cache.find(emoji => emoji.name === 'imretarded')

  // read data from file
  await fs.readFile(file, (error, data) =>{
    if(error) throw err;

    let str = data.toString();
    let tokens = str.split("\n");
    if(tokens[0] !== "")
      todoList = tokens;
  
  });


  if(!args[0])
    args[0] = "list";

  let digitRE = /\d/;
  let thingtodo = args;
  thingtodo = thingtodo.slice(1, thingtodo.length).join(" ");

  switch(args[0]){
    case "add":
      if(digitRE.test(thingtodo[0])){                 // does it start with a digiit?
        message.channel.send("Invalid request.");
      }else if(todoList.indexOf(thingtodo) < 0){
        todoList.push(thingtodo);
        message.channel.send(thingtodo + " has been added to the To-Do list. :pencil2:");
      } else{
        message.channel.send(thingtodo + " is already on the To-Do list.");
        message.react(imretarded);
      }
      break;
    case "remove":
    case "rem":
      let pos = todoList.indexOf(thingtodo-1);
      if(digitRE.test(thingtodo[0]-1))
        pos = thingtodo[0]-1;

      if (pos > -1){
        todoList.splice(pos, 1);
        let shiftedPos = (pos+1);
        shiftedPos = shiftedPos.toString();
        // console.log("----\nsp: " + shiftedPos);
        
        message.channel.send(thingtodo + " has been removed from the To-Do list.");
      }else{
        message.channel.send(thingtodo + " is not on the To-Do list.");
        message.react(imretarded);
      }
      break;
    case "clear":
      todoList = [];
      await fs.truncate(file, 0, (error) => {
        if(error) throw err;
      });
      message.channel.send("The To-Do list has been cleared. :gun:");
      break;
    default:
      if(todoList[0]){
        let title = ":memo:-- To-Do List --:memo:\n";
        message.channel.send(title + todoList.map( (item, index)  => `${index+1}. ${item}`).join("\n") + "\n");
      }else
        message.channel.send("The To-Do list is empty. :eyes:")
      break;
  }

  // write data to file
  if(todoList){
    todoList.forEach( async (item) =>{
      let noZero = (todoList.indexOf(item));
      noZero++;
      noZero = noZero.toString();
      
      let data = todoList.map( (item, index)  => `${item}`).join("\n");
      await fs.writeFile(file, data, (error)=>{
        if(error) throw err;
      });
    });
  }

};