const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let date = new Date(),
        weekdays = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"),
        weekday = weekdays[date.getDay()];

    let d = (new Date()).toString().split(" ").splice(1,3).join(" ");

    let dateEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription(weekday.toUpperCase() + " " + d.toUpperCase() + " **" + date.toUTCString().slice(16) + "**");

    message.channel.send(dateEmbed);

}

module.exports.help = {
    name: "date"
}
