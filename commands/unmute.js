const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
     // UNMUTE COMMAND
    if(cmd === `${prefix}unmute`) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");

        let mUser = message.guild.member(message.mentions.members.first()) || message.guild.members.get(args[0]);
        if(!mUser) return message.channel.send("CAN'T FIND USER**!**");

        let muterole = message.guild.roles.find(`name`, `MUTED // ❆`);

        if(!muterole || !toMute.roles.has(muterole)) return message.channel.send("THIS USER IS NOT MUTED**!**");

        await(mUser.removeRole(mUser.id));
        message.channel.send(`<:SNOWCHECK:459111379899514887> **//** ${mUser} HAS BEEN **UNMUTED!**`);

        let unmuteembed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setTimestamp()
        .setTitle("UNMUTE ❆")
        .addField("USER", mUser)
        .addField("MODERATOR", message.author)
        .addField("CHANNEL", message.channel)
        .setFooter("SNOW ❆", bot.user.displayAvatarURL);

        let snowlog = message.guild.channels.find(`name`, "snow");
        if(!snowlog) return;

        snowlog.send(unmuteembed);

        return;
    }
  
}

module.exports.help = {
  name: "unmute"
} 
