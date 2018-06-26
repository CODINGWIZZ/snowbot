const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
      // KICK USER
    if(cmd === `${prefix}kick`) {

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args [0]));
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
    // if(!permissions.has("KICK_MEMBERS")) return message.channel.send("CANNOT DO THAT **-** MAKE SURE I HAVE THE RIGHT PERMISSIONS**!**");
    if(kUser == message.author.id) return message.channel.send("YOU CAN NOT KICK YOURSELF**!**");
    if(!args[0]) return message.channel.send("PLEASE MENTION A USER THAT YOU WANT TO KICK**!**");
    if(!kUser) return message.channel.send("CAN'T FIND USER**!**");
    let kReason = args.slice(1).join(" ");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("THIS USER CAN'T BE KICKED**!**");
    if(!kReason) return message.channel.send("PLEASE INCLUDE A REASON FOR THE THE KICK**!**");

    message.guild.member(kUser).kick(kReason);
    message.channel.send(`${kUser} HAS BEEN **KICKED** BY ${message.author} BECAUSE: **${kReason}**`);
        
    let kickembed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setDescription("KICK **❆**")
    .addField("USER", kUser)
    .addField("MODERATOR", message.author)
    .addField("CHANNEL", message.channel)
    .addField("REASON", kReason)
    .setTimestamp()
    .setFooter("SNOW ❆", bot.user.displayAvatarURL);

    let snowlog = message.guild.channels.find(`name`, "snow");
    if(!snowlog) return;

    snowlog.send(kickembed);

    }

}

module.exports.help = {
  name: "kick"
}
