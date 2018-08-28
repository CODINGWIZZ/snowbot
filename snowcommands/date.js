const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();
    
    if(cmd === `${prefix}date`) {
        
        let date = new Date();
    
        message.channel.send("**" + date.toUTCString().toUpperCase() + "**");
    
    }

}

module.exports.help = {
    name: "date"
}
