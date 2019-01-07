const Discord = require("discord.js");
const snow = require("../snow.json");

const encode = require("strict-uri-encode");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    let bing = encode(args.join(" "));
    if(!bing) return message.channel.send("PLEASE ENTER A SEARCH QUERY**!**");

    let binglink = `https://bing.com/search?q=${bing}`;

    message.channel.send("SEARCHING **...**").then((bingMessage) => {

        bingMessage.edit("**FINISHED!**\n" + `<${binglink}>`);

    });

}

module.exports.help = {
    name: "bing"
}
