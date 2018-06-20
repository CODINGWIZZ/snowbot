  const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
  

    // PLAY ROCK PAPER SCISSORS WITH SNOW
if(cmd === `${prefix}rps`) {

    let rpsanswer = args.join(" ").toUpperCase();
    if(!rpsanswer) return message.channel.send("CAN'T FIND THE  MESSAGE**!**");

    let rps = ["ROCK", "PAPER", "SCISSORS"];

    if(!rps.includes(rpsanswer)) {

        return message.channel.send("PLEASE ENTER ROCK **/** PAPER **/** SCISSORS TO PLAY**!**");

    }

    let snowrpsanswer = rps[Math.floor(Math.random() * rps.length)];

    let result = "I WIN**!**";

    if(rpsanswer === snowrpsanswer) {
        result = "IT'S A TIE**!**";
    }
    else if (rpsanswer === "ROCK") {
        if(snowrpsanswer === "SCISSORS") {
            result = "YOU WIN**!**";
        }
    }
    else if (rpsanswer === "PAPER") {
        if(snowrpsanswer === "ROCK") {
            result = "YOU WIN**!**";
        }
    }
    else if (rpsanswer === "SCISSORS") {
        if(snowrpsanswer === "PAPER") {
            result = "YOU WIN**!**";
        }
    }

    message.channel.send(`**${message.author.username},** YOU CHOOSE **${rpsanswer}** AND I CHOOSE **${[snowrpsanswer]}!** ${result}`);

}

  
}

module.exports.help = {
  name: "rps"
} 

