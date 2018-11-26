const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async(bot, message, args) => {

    let roles = message.guild.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => role);
    
    let serverrolesEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription("SERVERROLES **" + snow.snowflake + "**")
    .addField("ROLES **( " + message.guild.roles.size + " )**", roles.join(" ") + " @everyone")
    .setFooter("SERVERROLES | SNOW " + snow.snowflake, bot.user.displayAvatarURL);
    
    message.channel.send(serverrolesEmbed);

}

module.exports.help = {
    name: "serverroles"
}
