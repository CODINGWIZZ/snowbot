const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    message.channel.send("PINGING**...**").then((pingMessage) => {
        
        let ping = pingMessage.createdTimestamp - message.createdTimestamp;

        pingMessage.edit("THE PING IS `" + ping + "ms`**!**");

    });

}

module.exports.help = {
    name: "ping"
}
