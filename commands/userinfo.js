const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

let snowonline = require("./img/snowonline.png");
let snowidle = require("./img/snowidle.png");
let snowdnd = require("./img/snowdnd.png");
let snowoffline = require("./img/snowoffline.png");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
  let status = {
  online: `ONLINE ${snowonline}`,
  idle: `IDLE ${snowidle}`,
  dnd: `DO NOT DISTURB ${snowdnd}`,
  offline: `OFFLINE ${snowoffline}`
}
  
  // USER INFO
  if(cmd === `${prefix}userinfo`) {

  let user = message.mentions.users.first() || message.guild.members.get(args [0]) || message.author;
  
  let userinfoEmbed = new Discord.RichEmbed()
  .setColor(botconfig.blue)
  .setDescription("USER INFO **❆** **// " + user.username + "**")
  .addField("** **", `${user.presence.game ? `Playing **${user.presence.game.name}**` : "NOT PLAYING ANYTHING**!**"}`)
  .addField("FULL NAME", `**${user.username}**#${user.discriminator}`)
  .addField("ID", user.id)
  .addField("STATUS", `${status[user.presence.status]}`)
  .addField("CREATED", user.createdAt.toDateString())
  .setFooter("USER INFO | SNOW ❆", bot.user.displayAvatarURL);
            
  message.channel.send(userinfoEmbed);
  
    }

}

module.exports.help = {
  name: "userinfo"
}
