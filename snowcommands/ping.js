const Discord = require("discord.js");
const snow = require("../snow.json");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    let ping = bot.pings[0];

    message.channel.send("PINGING **...**").then((pingMessage) => {

        pingMessage.edit("THE PING IS `" + ping + "ms`**!**");

    });

}

module.exports.help = {
    name: "ping"
}
