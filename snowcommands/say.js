const Discord = require("discord.js");
const snow = require("../snow.json");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");

    let sayMessage = args.join(" ");
    if(!sayMessage) return message.channel.send("PLEASE ENTER A MESSAGE YOU WANT TO SAY TROUGH **SNOW!**");

    message.delete();
    message.channel.send(`**${message.author.username}** SAID THROUGH **SNOW:**\n\n${sayMessage}`);

}

module.exports.help = {
    name: "say"
}
