const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
      // WARN USER
    if(cmd === `${prefix}warn`) {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
    // if(!permissions.has("MANAGE_MESSAGES")) return message.channel.send("CANNOT DO THAT **-** MAKE SURE I HAVE THE RIGHT PERMISSIONS**!**");
    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!args[0]) return message.channel.send("PLEASE MENTION A USER THAT YOU WANT TO WARN**!**");
    if(!wUser) return message.channel.send("CAN'T FIND USER**!**");
    if(wUser.id === message.author.id) return message.channel.send("YOU CAN NOT WARN YOURSELF**!**");
    if(wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("THAT USER CAN'T BE WARNED**!**");
    let reason = args.slice(1).join(" ");
    if(!reason) return message.channel.send("PLEASE INCLUDE A REASON FOR THE WARN**!**");
      
    message.channel.send(`${wUser} HAS BEEN **WARNED** BECAUSE: **${reason}!**`);

    let warnEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setAuthor("WARN ❆")
    .setTimestamp()
    .setDescription("YOU HAVE BEEN WARNED IN " + "**" + message.guild.name + "!**")
    .addField("REASON", reason)
    .setFooter("SNOW ❆", bot.user.displayAvatarURL);

    wUser.send(warnEmbed);

    let warnstaffEmbed = new Discord.RichEmbed()
    .setAuthor("WARN ❆")
    .setColor(botconfig.blue)
    .setTimestamp()
    .addField("USER", wUser)
    .addField("MODERATOR", message.author)
    .addField("CHANNEL", message.channel)
    .addField("REASON", reason)
    .setFooter("SNOW ❆", bot.user.displayAvatarURL);

    let snowlog = message.guild.channels.find(`name`, "snow");
    if(!snowlog) return;

    snowlog.send(warnstaffEmbed);

    }
    
}

module.exports.help = {
  name: "warn"
}
