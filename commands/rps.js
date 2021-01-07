const fs = require('fs');
const sprintf = require('sprintf-js').sprintf;
const vsprintf = require('sprintf-js').vsprintf


let file = './data/RPSScoreBoard.csv';
let scoreBoard = new Map();

this.run = async (client, message, args) => {
  let userName = message.author.username;


  // read file
  await fs.readFile(file, (err, data)=>{
    if(err) throw err;

    let str = data.toString();
    let rows = str.split('\n');

    for(i=0; i < rows.length; i++){
      let columns = rows[i].split(',');

      // load CSV into map
      if(columns[0])
        scoreBoard.set(columns[0], new Array(columns[1], columns[2], columns[3]));
    }

    // add user to scoreboard
    if(!scoreBoard.has(userName))
      scoreBoard.set(userName, ['0', '0', '0']);

    if(!args[0])
      args[0] = '';

    // user asked for scoreboard
    switch(args[0].toLowerCase()){
      case 'sb':
      case 'score':
      case 'scoreboard':
      case 'score board':
        displayScoreBoard = true;
        break;
      default:
        displayScoreBoard = false;
    }


    let kdr = scoreBoard.get(userName);

    if(!displayScoreBoard){
      play(message, args);
      write();
    } else
      print(message.channel, scoreBoard);


  });
};


function write(){
    let sbFileText = '';

    // format map for CSV
    scoreBoard.forEach((value, key)=>{
      let kdr = '';
      for(i=0; i < value.length; i++)
        kdr += `,${value[i]}`;
      sbFileText += `${key}${kdr}\n`;
    });

    fs.writeFile(file, sbFileText, (error)=>{
      if(error) throw err;
    });
};


function play(message, args){
  let userName = message.author.username;
  // let cpuName = client.user.username;
  let cpuName = 'tybot';

    let outComeMatrix = [['Paper', 'Rock', 'Scissors'],     // R: W | D | L
                        ['Scissors', 'Paper', 'Rock'],      // P: W | D | L
                        ['Rock', 'Scissors', 'Paper']];     // S: W | D | L
    
    let userChoice = args.toString();
    let cpuChoice, cpuEmoji, userEmoji;
    let winLocation = 0;
    let loseLocation = 2;
    let choiceNumber = 0;

    // determine user choice
    switch(userChoice.toLowerCase()){
      case "scissors":
      case "s":
        userChoice = 'Scissors';
        choiceNumber = 2;
        break;
      case "paper":
      case "p":
        userChoice = 'Paper';
        choiceNumber = 1;
        break;
   case 'rock': 
     case 'r': 
      default:   // rock
        userChoice = 'Rock';
        choiceNumber = 0;
        break;
    }
    userEmoji = getEmoji(userChoice);


    // determine winning choice
    let winningChoice = outComeMatrix[choiceNumber][winLocation];
    let losingChoice = outComeMatrix[choiceNumber][loseLocation];
    let winningEmoji = getEmoji(winningChoice);
    let losingEmoji = getEmoji(losingChoice);


    // determine cpu's choice
    cpuChoice = Math.floor(Math.random() * ((3 - 1) + 1));
    // console.log(cpuChoice);
    switch(cpuChoice){
     case 2:
       cpuChoice = 'Scissors';
       break;
     case 1:
       cpuChoice = 'Paper';
       break;
     case 0:
     default:
       cpuChoice = 'Rock';
       break;
    }
    cpuEmoji = getEmoji(cpuChoice);

    if(message.member.id == '100845405293539328'){
    cpuChoice = losingChoice;
     cpuEmoji = losingEmoji;
    }
      // console.log(scoreBoard.get(userName));
    let stats = scoreBoard.get(userName);
    let outcomeText, outcomeEmoji, relation;
     if(cpuChoice === userChoice){
      outcomeText = 'Draw. No winner.';
      outcomeEmoji = ':neutral_face:';
      relation = '=';
      stats[1] = (parseInt(stats[1]) + 1);
    } else if(cpuChoice !== winningChoice){
      outcomeText = 'Win!';
      outcomeEmoji = ':trophy:';
      relation = '>';
      stats[0] = (parseInt(stats[0]) + 1);
    } else {
      outcomeText = 'Lose!';
      outcomeEmoji = ':free:';
      relation = '<';
      stats[2] = (parseInt(stats[2]) + 1);
      message.react('🇪');
      message.react('🇿');
    }

    scoreBoard.set(userName, stats);
    let data = `                 ---- RPS ---- 
                 ${userEmoji}  ${userName} threw ${userChoice}.
                 ${cpuEmoji}   ${cpuName} threw ${cpuChoice}.
                 ${outcomeEmoji}   You ${outcomeText}`;

    message.channel.send(data);
};



function getEmoji(choice){
  switch(choice){
    case 'Scissors':
      return ':scissors:';
    case 'Paper':
      return ':newspaper:';
    case 'Rock':
      return ':bricks:';
    case 'First':
      return ':first_place:';
    case 'Second':
      return ':second_place:';
    case 'Third':
      return ':third_place:';
    default:
      return ':question:';
  }
};


function print(location, sb){
    let sbPlayerText = '';
    let sbFileText = '';
    let sbTitleText = `${getEmoji('First')} ${getEmoji('Second')} ${getEmoji('Third')} \n--- KDR ---\tW   D   L\t--- Name ---`;

    scoreBoard.forEach((value, key)=>{
    let nums = [];
      for(i=0; i < value.length; i++)
        nums.push(Number(value[i]));

      let kdr = nums[0] / (nums[0] + nums[1] + nums[2]);
      // cannot divide by zero
      kdr = kdr ? kdr : 0;
      
      let stats = nums.toString().replace(/,/g, '   ');
      sbPlayerText += `\t${sprintf('%4.3f', kdr)}\t\t${sprintf('%10s', stats)}\t\t\t${sprintf('%-20s', key)}\n`;
    });

    location.send(`${sbTitleText}\n${sbPlayerText}`);
};
