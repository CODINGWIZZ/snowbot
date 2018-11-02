const Discord = require("discord.js");
const snow = require("../snow.json");

const encode = require("strict-uri-encode");

module.exports.run = async (bot, message, args) => {
    
    let encodemessage = encode(args.join(" "));
    if(!encodemessage) return message.channel.send("PLEASE ENTER A MESSAGE YOU WANT TO ENCODE**!**");
    
    message.channel.send("ENCODING MESSAGE **...**").then((encodeMessage) => {
    
        let encodeEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription(encodemessage);
        
        encodeMessage.edit(encodeEmbed);
    
    });
    
}

module.exports.help = {
    name: "encode"
}
