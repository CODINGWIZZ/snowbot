const Discord = require("discord.js");
const snow = require("../snow.json");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    let roll = Math.floor(((Math.random()) * 6) + 1);

    message.channel.send("ROLLING **...**").then((rollMessage) => {

        rollMessage.edit(`**${message.author.username},** YOU ROLLED **${roll}!**`);

    });

}

module.exports.help = {
    name: "roll"
}
