const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
  // BAN COMMAND
  if(cmd === `${prefix}ban`) {
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
  // if(!permissions.has("BAN_MEMBERS")) return message.channel.send("CANNOT DO THAT **-** MAKE SURE I HAVE THE RIGHT PERMISSIONS**!**");
  if(bUser == message.author.id) return message.channel.send("YOU CAN NOT BAN YOURSELF**!**");
  if(!args[0]) return message.channel.send("PLEASE MENTION A USER THAT YOU WANT TO BAN**!**");
  if(!bUser) return message.channel.send("CAN'T FIND USER**!**");
  let bReason = args.slice(1).join(" ");
  if(bUser == bot.user.id) return;
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("THAT USER CAN'T BE BANNED**!**");
  if(!bReason) return message.channel.send("PLEASE INCLUDE A REASON FOR THE BAN**!**");

  message.guild.member(bUser).ban(bReason);
  message.channel.send(`${bUser} HAS BEEN **BANNED** BY ${message.author} BECAUSE: **${bReason}**`);        
        
  let banEmbed = new Discord.RichEmbed()
  .setColor(botconfig.blue)
  .setTimestamp()
  .setDescription("BAN **❆**")
  .addField("USER", bUser)
  .addField("MODERATOR", message.author)
  .addField("CHANNEL", message.channel)
  .addField("REASON", bReason)
  .setFooter("SNOW ❆", bot.user.displayAvatarURL);

  let snowlog = message.guild.channels.find(`name`, "snow");
  if(!snowlog) return;
   
  snowlog.send(banEmbed);

    }
  
}

module.exports.help = {
  name: "ban"
}
