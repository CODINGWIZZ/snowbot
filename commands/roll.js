const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
  // ROLL THE DICE
  if(cmd === `${prefix}roll`) {

  let roll = Math.floor((Math.random() * 6 + 1))

  return message.channel.send("**" + message.author.username + ",** YOU ROLLED **" + roll + "!**");
  
    }

}

module.exports.help = {
  name: "roll"
}
