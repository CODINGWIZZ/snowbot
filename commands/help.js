const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
      if(cmd === `${prefix}help`) {
        
        let helpEmbed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setTitle("HELP ❆")
        .setDescription("YOU CAN SEE ALL OF MY COMMANDS [**HERE**](https://discordsnowbot.weebly.com/snow) AND HOW TO USE THEM**!**\nDOWN HERE, YOU'LL SEE ALL COMMANDS FOR SNOW __**RIGHT NOW**__**!**")
        .addField("GENERAL", "`ping` `roll` `say` `snow` `invite` `changelog` `help`")
        .addField("MODERATION", "`addrole` `removerole` `ban` `kick` `clear` `warn` `mute` `deafen` `tempmute` `unmute` `tempdeafen` `undeafen`")
        .addField("FUN", "`rps` `avatar` `8ball` `vote` `slot` `randomcolor` `color` `fancy` `randomimage` `urban` `gif` `dog` `cat` `reminder`")
        .addField("UTILITY", "`fortnite` `shorten` `weather` `forecast` `google` `bing` `duckduckgo` `youtube` `lmgtfy` `calculate`")
        .addField("INFO", "`serverinfo` `roleinfo` `userinfo`")
        .setFooter("HELP | SNOW ❆", bot.user.displayAvatarURL);
        
        message.channel.send(helpEmbed);
    
    }

}

module.exports.help = {
  name: "help"
}   
