const Discord = require("discord.js");
const snow = require("../snow.json");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    let helpEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription("HELP **" + snow.snowflake + "**\n\n__**ALL COMMANDS:**__\n" + "`s!8ball` `s!addrole` `s!announce` `s!ascii` `s!avatar` `s!ban` `s!bing` `s!cat` `s!clear` `s!color` `s!deafen` `s!dog` `s!fancy` `s!feedback` `s!forecast` `s!fox` `s!gif` `s!google` `s!kick` `s!lmgtfy` `s!mute` `s!ping` `s!randomcolor` `s!reminder` `s!removerole` `s!roll` `s!rps` `s!say` `s!serverinfo` `s!shorten` `s!tempdeafen` `s!tempmute` `s!translate` `s!undeafen` `s!unmute` `s!unshorten` `s!urban` `s!userinfo` `s!vote` `s!warn` `s!weather` `s!tyoutube`\n\nI DO APOLOGIZE BECAUSE SOME OF THESE COMMANDS DOESN'T WORK. I HAVE VERY MUCH TO DO AND I HAVEN'T BEEN EDITING FILES IN SNOW FOR A VERY LONG TIME**!**")
    .setFooter("HELP | SNOW " + snow.snowflake, bot.user.displayAvatarURL);

    message.channel.send(helpEmbed);

}

module.exports.help = {
    name: "help"
}
