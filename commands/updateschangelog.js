const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
      if(cmd === `${prefix}changelog` || cmd === `${prefix}updates` || cmd === `${prefix}updateschangelog`) {
     
        message.channel.send("**UPDATES // CHANGELOG ❆**\n" + `<${changelog}>`);
        
      let updateschangelogEmbed = new Discord.RichEmbed()
      .setColor(botconfig.blue)
      .setDescription("**UPDATES // CHANGELOG ❆**\nDo you want to see more about SNOW. More, behind the scenes. Then, go to UPDATES & CHANGELOG. As you already can tell, you can see updates about SNOW but also new commands and problems. Everything will be logged there!\n[**UPDATES & CHANGELOG**](https://discordsnowbot.weebly.com/updates-changelog)")
      .setFooter("UPDATES & CHANGELOG | SNOW ❆", bot.user.displayAvatarURL);
        
      message.channel.send(updateschangelogEmbed);
        
    }

  
}

module.exports.help = {
  name: "changelog"
} 
