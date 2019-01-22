const Discord = require("discord.js");
const snow = require("../snow.json");

const unshorten = require("isgd");

module.exports.run = async (bot, message, args) => {

    let isgdlink = args[0];
    if(!isgdlink) return message.channel.send("PLEASE ENTER A VALID ISGD LINK THAT YOU WANT TO UNSHORTEN**!**");

    unshorten.lookup(isgdlink, function(res) {

        message.channel.send("UNSHORTENING ISGD LINK**...**").then((unshortenMessage) => {

            if(res.startsWith("Error:")) return unshortenMessage.edit("PLEASE ENTER A VALID ISGD LINK YOU WANT TO UNSHORTEN**!**");

            unshortenMessage.edit("**FINISHED!**\n" + `<${res}>`);

        });

    });

}

module.exports.help = {
    name: "unshorten"
}
