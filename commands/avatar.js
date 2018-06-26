const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
      // CHECK AVATAR
    if(cmd === `${prefix}avatar`) {

    const avatar = message.mentions.users.first() || message.author;
    
    if (!avatar.avatarURL) return message.channel.send("CAN'T FIND AVATAR**!**");

    let avatarEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setAuthor(avatar.username + "  //  AVATAR ❆")
    .setTitle("[DOWNLOAD]")
    .setURL(avatar.avatarURL)
    .setImage(avatar.avatarURL)
    .setFooter("AVATAR | SNOW ❆", bot.user.displayAvatarURL);

    return message.channel.send(avatarEmbed);

    }
  
}

module.exports.help = {
  name: "avatar"
} 
