const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}snow`) {

        let snowEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("SNOW INFORMATION **❆**")
        .addField("BOT NAME", "**" + snow.name + "**#" + bot.user.discrimiator)
        .addField("DEVELOPER", "**" + snow.dev + "**#7897")
        .addField("VERSION", snow.version)
        .addField("WEBSITE", "discordsnowbot.weebly.com")
        .addField("STATS", `**${bot.guilds.size} SERVERS\n\n${bot.channels.size} CHANNELS\n\n${bot.users.size} USERS**`)
        .setFooter("BOT STATS | SNOW ❆", bot.user.displayAvatarURL);
        
        message.channel.send(snowEmbed);

    } 

}

module.exports.help = {
    name: "snow"
}
