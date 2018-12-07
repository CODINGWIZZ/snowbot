const Discord = require("discord.js");
const snow = require("../snow.json");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    let helpEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription("HELP **" + snow.snowflake + "**\n YOU CAN SEE ALL COMMANDS [**HERE**](https://discordsnowbot.weebly.com/commands.html)**!**")
    .setFooter("HELP | SNOW " + snow.snowflake, bot.user.displayAvatarURL);

    message.channel.send(helpEmbed);

}

module.exports.help = {
    name: "help",
    alias: ["commands"]
}
