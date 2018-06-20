const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
  // FLIP A COIN
  if(cmd === `${prefix}flipcoin` || cmd === `${prefix}coin`) {

  let coin = ["HEADS", "TAILS"];

  let coinrandom = Math.floor((Math.random()) * coin.length);

  message.channel.send("**" + message.author.username + ",** I FLIPPED **" + coin[coinrandom] + "!**");

  }
  
}

module.exports.help = {
  name: "flipcoin"
}
