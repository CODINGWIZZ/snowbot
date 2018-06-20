const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
   // INVITE SNOW
   if(cmd === `${prefix}invite`) {

   let inviteembed = new Discord.RichEmbed()
   .setColor(botconfig.blue)
   .setDescription("`INVITE SNOW:`\nhttps://bit.do/snowbot\n`TWITTER:`\nhttps://bit.do/snowtwitter\n`WIZZ TWITTER:`\nhttps://bit.do/codingwizz")
   .setFooter("INVITE BOT | SNOW ❆", bot.user.displayAvatarURL);

   message.channel.send(inviteembed);
    
  }

}

module.exports.help = {
  name: "invite"
}
