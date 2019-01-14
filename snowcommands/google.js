const Discord = require("discord.js");
const snow = require("../snow.json");

const encode = require("strict-uri-encode");

module.exports.run = async (bot, message, args) => {

    let google = encode(args.join(" "));
    if(!google) return message.channel.send("PLEASE ENTER A SEARCH QUERY**!**");

    let googlelink = `https://google.com/search?q=${google}`;

    message.channel.send("SEARCHING **...**").then((googleMessage) => {

        googleMessage.edit("**FINISHED!**\n" + `<${googlelink}>`);

    });

}

module.exports.help = {
    name: "google"
}
