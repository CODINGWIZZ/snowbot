const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
  // INFO ABOUT SNOW
  if(cmd === `${prefix}snow`) {
  let snowinfoembed = new Discord.RichEmbed()
  .setDescription("**BOT INFORMATION ❆**")
  .setColor(botconfig.blue)
  .addField("BOT NAME", bot.user.username)
  .addField("OWNER / DEVELOPER", "**WIZZ**#7897")
  .addField("VERSION", "**SNOW** ❆ | **1.9.0**")
  .addField("WEBSITE", "**https://discordsnowbot.weebly.com/**")
  .addField("STATS", `**${bot.guilds.size} SERVERS\n\n${bot.channels.size} CHANNELS\n\n${bot.users.size} USERS**`)
  .setFooter("BOT INFORMATION | SNOW ❆", bot.user.displayAvatarURL);
        
  message.channel.send(snowinfoembed);

    }

}

module.exports.help = {
  name: "snow"
}
