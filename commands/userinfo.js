const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
  // USER INFO
  if(cmd === `${prefix}userinfo`) {

  let user = message.mentions.users.first() || message.guild.members.get(args [0]) || message.author;
  
  let userinfoEmbed = new Discord.RichEmbed()
  .setColor(botconfig.blue)
  .addField("** **",  `${user.username}`)
  .setDescription("USER INFO **❆**")
  .addField("FULL NAME", `**${user.username}**#${user.discriminator}`)
  .addField("ID", user.id)
  .addField("NICKNAME", user.nickname ? user.nickname : "NO NICKNAME")
  .addField("STATUS", user.presence.status.toUpperCase())
  .addField("JOINED THIS SERVER", user.joinedAt)
  .addField("CREATED", user.createdAt.toDateString())
  .addField("ROLE(S)", user.roles.map.join(" | ")
  .setFooter("USER INFO | SNOW ❆", user.displayAvatarURL);
            
  message.channel.send(userinfoEmbed);
  
    }

}

module.exports.help = {
  name: "userinfo"
}
