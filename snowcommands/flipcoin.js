const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let coin = ["HEADS", "TAILS"];
    let coinrandom = Math.floor((Math.random()) * coin.length);

    message.channel.send(`**${message.author.username},** I FLIPPED **${coin[coinrandom]}!**`);

}

module.exports.help = {
    name: "flipcoin"
} 
