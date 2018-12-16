const Discord = require("discord.js");
const snow = require("../snow.json");

const figlet = require("figlet")

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    let asciimessage = args.join(" ");
    if(!asciimessage) return message.channel.send("PLEASE ENTER A MESSAGE THAT YOU WANT TO CONVERT TO ASCII**!**");

    message.channel.send("GENERATING ASCII MESSAGE **...**").then((asciiMessage) => {

        figlet(asciimessage, function(err, data) {
        
            if(err) {
             
                console.log(err);
                return; 
                
            }
            
            asciiMessage.edit(data, {
               code: "md" 
            });
            
        }

    });

}

module.exports.help = {
    name: "ascii"
}
