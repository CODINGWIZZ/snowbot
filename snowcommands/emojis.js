const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let emojilist = message.guild.emojis.map(e => e.toString()).join(" ");

    let emojiEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription("EMOJIS **" + snow.snowflake + "**\n" + emojilist)
    .setFooter("EMOJIS | SNOW " + snow.snowflake, bot.user.displayAvatarURL);

    message.channel.send(emojiEmbed);

}

module.exports.help = {
    name: "emojis"
}
