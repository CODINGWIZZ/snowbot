const Discord = require("discord.js");
const snow = require("../snow.json");

const encode = require("strict-uri-encode");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    let youtube = args.slice(1).join("+");
    if(!youtube) return message.channel.send("PLEASE ENTER A SEARCH QUERY TO SEARCH ON YOUTUBE WITH**!**");

    let youtubelink = `https://youtube.com/results?q=${youtube}`;

    message.channel.send("SEARCHING ON YOUTUBE **...**").then((youtubeMessage) => {

        youtubeMessage.edit("**FINISHED!**\n" + `<${youtubelink}>`);

    });

}

module.exports.help = {
    name: "youtube"
}
