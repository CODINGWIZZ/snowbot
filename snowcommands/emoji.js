const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let emoji = args[0];
    if(!emoji) return message.channel.send("PLASE ENTER A EMOJI YOU WANT TO SEE**!**");

    let theemoji = message.guild.emojis.find(emojiname => emojiname.name === emoji);
    if(!theemoji) return message.channel.send("COULDN'T FIND THAT EMOJI**!**");

    let emojiimagelink = `https://cdn.discordapp.com/emojis/${theemoji}.png`;

    let emojiEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription("EMOJI **" + snow.snowflake + "**")
    .setImage(emojiimagelink)
    .setFooter("EMOJI | SNOW " + snow.snowflake, bot.user.displayAvatarURL);

    message.channel.send(emojiEmbed);

}

module.exports.help = {
    name: "emoji"
}
