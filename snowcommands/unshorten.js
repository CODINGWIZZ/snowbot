const Discord = require("discord.js");
const snow = require("../snow.json");

const shorten = require("isgd");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}unshorten`) {

        let isgdlink = args[0];
        if(!isgdlink) return message.channel.send("PLEASE ENTER A IS.GD LINK THAT YOU WANT TO SEE THE LONGER VERISION OF**!**");

        shorten.lookup(isgdlink, function(res) {

            message.channel.send("LOOKING UP SHORTENED LINK **...**").then((lookupMessage) => {

                if(res.startsWith("Error:")) return lookupMessage.edit("PLEASE ENTER A VALID ISGD LINK THAT YOU WANT ME TO LOOKUP**!**");

                lookupMessage.edit("**FINISHED!**\n" + `<${res}>`);

            });

        });

    }

}

module.exports.help = {
    name: "unshorten"
}
