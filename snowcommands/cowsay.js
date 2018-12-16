const Discord = require("discord.js");
const snow = require("../snow.json");

const cowsay = require("cowsay")

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    let messagecowsay = args.join(" ");
    if(!messagecowsay) return message.channel.send("PLEASE ENTER A MESSAGE THAT YOU WANT THE COW TO SAY**!**");

    message.channel.send("GENERATING THE COWSAY MESSAGE **...**").then((cowsayMessage) => {
    
        cowsay.say({
        
            text: messagecowsay
        
        });
    
    });

}

module.exports.help = {
    name: "ascii"
}
