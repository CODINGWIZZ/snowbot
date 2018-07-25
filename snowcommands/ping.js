const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}ping`) {

        let ping = bot.pings[0];

        message.channel.send("PINGING **...**").then((pingMessage) => {

            pingMessage.edit("THE PING IS `" + ping + "ms`**!**");

        });

    }

}

module.exports.help = {
    name: "ping"
}
