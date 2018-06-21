const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const math = require("math-expression-evaluator");

module.exports.run = async (bot, message, args) => {
  
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();
    

  
}

module.exports.help = {
  name: "calculate"
}
