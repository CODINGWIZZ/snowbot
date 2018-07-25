const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}roll`) {

        let roll = Math.floor(((Math.random()) * 6) + 1);

        message.channel.send("ROLLING **...**").then((rollMessage) => {

            rollMessage.edit(`**${message.author.username},** YOU ROLLED **${roll}!**`);

        });

    }

}

module.exports.help = {
    name: "roll"
}
