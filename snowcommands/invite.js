const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let inviteEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription("INVITE SNOW [**HERE**](https://discordapp.com/oauth2/authorize?client_id=417210018576990208&scope=bot&permissions=8)**!**")
    .setFooter("INVITE | SNOW " + snow.snowflake, bot.user.displayAvatarURL);
    
    message.channel.send(inviteEmbed);

}

module.exports.help = {
    name: "invite"
}
