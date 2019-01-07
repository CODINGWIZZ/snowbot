const Discord = require("discord.js");
const snow = require("../snow.json");

const encode = require("strict-uri-encode");

module.exports.run = async (bot, message, args) => {

    let maps = args.slice(1).join("+");
    if(!maps) return message.channel.send("PLEASE ENTER A SEARCH QUERY YOU WANT TO SEARCH FOR IN GOOGLE MAPS**!**");
    
    let mapslink = `https://google.com/maps?q=${maps}`;
    
    message.channel.send("SEARCHING FOR RESULTS IN GOOGLE MAPS **...**").then((mapsMessage) => {
    
        mapsMessage.edit("**FINISHED!**\n" + `<${mapslink}>`);
    
    });

}

module.exports.help = {
    name: "maps"
}
