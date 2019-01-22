const Discord = require("discord.js");
const snow = require("../snow.json");

const encode = require("strict-uri-encode");

module.exports.run = async (bot, message, args) => {
    
    let encodemessage = encode(args.join(" "));
    if(!encodemessage) return message.channel.send("PLEASE ENTER A MESSAGE YOU WANT TO ENCODE**!**");
    
    let encodeEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription("ENCODE **" + snow.snowflake + "**")
    .addField("INPUT", "```" + args.join(" ") + "```")
    .addField("OUTPUT", "```" + encodemessage + "```")
    .setFooter("ENCODE | SNOW " + snow.snowflake, bot.user.displayAvatarURL);
        
    message.channel.send(encodeEmbed);
    
}

module.exports.help = {
    name: "encode"
}
