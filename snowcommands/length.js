const Discord = require("discord.js");
const snow = requrie("../snow.json");

module.exports.run = async(bot, message, args) => {

    let messagelength = args.join(" ");
    if(!messagelength) return message.channel.send("PLEASE ENTER A MESSAGE TO THE THE LENGTH OF**!**");
    
    let currentlength = messagelength.length;
    
    message.channel.send("THE MESSAGE YOU ENTERED HAS **" + currentlength + "** CHARACTERS**!**");

}

module.exports.help = {
    name: "length"
}
