const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
  let inviteEmbed = new Discord.RichEmbed()
  .setColor(botconfig.blue)
  .setDescription("[**INVITE SNOW**](https://discordapp.com/oauth2/authorize?client_id=417210018576990208&scope=bot&permissions=8)\n\n[**TWITTER**](https://twitter.com/DISCORDSNOWBOT)\n\n[**WIZZ TWITTER**](https://twitter.com/CODINGWIZZ)")
  .setFooter("INVITE BOT | SNOW ❆", bot.user.displayAvatarURL);
  
  message.channel.send(inviteEmbed);

}

module.exports.help = {
  name: "invite"
}
