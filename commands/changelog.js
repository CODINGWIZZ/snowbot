const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
      if(cmd === `${prefix}changelog` || cmd === `${prefix}updates`) {
        
        let changelog = "https://discordsnowbot.weebly.com/updateschangelog";
     
        message.channel.send("**UPDATES // CHANGELOG ❆**\n" + `<${changelog}>`);
        
    }

  
}

module.exports.help = {
  name: "changelog"
} 
