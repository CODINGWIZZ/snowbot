const Discord = require("discord.js");
const snow = require("../snow.json");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    let date = new Date();

    let dateEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription(date.toUTCString().toUpperCase().join(16).slice(12) + "**" + date.toUTCString().slice(16) + "**");

    message.channel.send(dateEmbed);

}

module.exports.help = {
    name: "date"
}
