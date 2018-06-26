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
  .setDescription("USER INFO **❆** **// " + user.username + "**")
  .addField("** **", `${user.presence.game ? `Playing **${user.presence.game.name}**` : "NOT PLAYING ANYTHING**!**"}` + "\n")
  .addField("FULL NAME", `**${user.username}**#${user.discriminator}`)
  .addField("ID", user.id)
  .addField("NICKNAME", `${user.nickname ? `${user.nickname}` : "NO NICKNAME**!**"}`)
  .addField("STATUS", user.presence.status.toUpperCase())
  .addField("CREATED", user.createdAt.toDateString())
  .addField("ROLES", `${user.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "NO ROLES**!**"}`)
  .setFooter("USER INFO | SNOW ❆", bot.user.displayAvatarURL);
            
  message.channel.send(userinfoEmbed);
  
    }

}

module.exports.help = {
  name: "userinfo"
}
