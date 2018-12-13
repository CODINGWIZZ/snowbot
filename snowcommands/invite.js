const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let inviteEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription("INVITE SNOW [**HERE**](https://discorsnowbot.weebly.com/invite)**!**")
    .setFooter("INVITE | SNOW " + snow.snowflake, bot.user.displayAvatarURL);
    
    message.channel.send(inviteEmbed);

}

module.exports.help = {
    name: "invite"
}
