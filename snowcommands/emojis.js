const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let emojilist = message.guild.emojis.map(e => e.toString()).join(" ");
    let totalemojis = message.guild.emojis.size;
    
    let emojiemojis = "EMOJIS";
    
    if(totalemojis === 1) {
     
        emojiemojis = "EMOJI"
        
    } else {
     
        emojiemojis = "EMOJIS";
        
    };
    
    if(totalemojis === 0 || !totalemojis) return message.channel.send("IT LOOKS LIKE THIS SERVER DOESN'T HAVE ANY EMOJI**!**");
    

    let emojiEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription("EMOJIS **" + snow.snowflake + "**\n" + emojilist)
    .setFooter(`${totalemojis} ${emojiemojis} | SNOW ` + snow.snowflake, bot.user.displayAvatarURL);

    message.channel.send(emojiEmbed);

}

module.exports.help = {
    name: "emojis"
}
