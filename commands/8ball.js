const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
      // 8BALL COMMAND
    if(cmd === `${prefix}8ball`) {

    if(!args[2]) return message.channel.send("PLEASE ASK A QUESTION**!**");

    let question = args.slice(0).join(" ");

    let answers = ["NO", "NOT TODAY", "IT IS DECIDEDLY SO", "WITHOUT A DOUBT", "YES **-** DEFINITELY", "YOU MAY RELY ON IT", "AS I SEE IT YES", "MOST LIKELY", "OUTLOOK GOOD", "SIGNS POINT TO YES", "TRY AGAIN", "ASK AGAIN LATER", "BETTER NOT TELL YOU RIGHT NOW", "CAN NOT PREDICT RIGHT NOW", "CONCENTRATE AND ASK AGAIN", "DON'T COUNT ON IT", "MY REPLY IS NO", "MY SOURCES SAY NO", "OUTLOOK NOT SO GOOD", "VERY DOUBTFUL"];

    let answerresult = Math.floor((Math.random() * answers.length));

    message.channel.send(`:8ball: **|** **${message.author.username},** ${answers[answerresult]}**!**`);

}
  
}

module.exports.help = {
  name: "8ball"
} 
