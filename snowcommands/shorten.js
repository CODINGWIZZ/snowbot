const Discord = require("discord.js");
const snow = require("../snow.json");

const shorten = require("isgd");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    let link = args[0];
    if(!link) return message.channel.send("PLEASE ENTER A LINK THAT YOU WANT TO SHORTEN**!**");

    shorten.shorten(link, function(res) {

        message.channel.send("SHORTENING LINK **...**").then((shortenMessage) => {

            if(res.startsWith("Error:")) return message.channel.send("PLEASE ENTER A VALID LINK**!**");

            shortenMessage.edit("**FINISHED!**\n" + `<${res}>`);

        });

    });

}

module.exports.help = {
    name: "shorten"
}
