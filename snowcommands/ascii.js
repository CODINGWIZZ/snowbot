const Discord = require("discord.js");
const snow = require("../snow.json");

const figlet = require("figlet");

module.exports.run = async (bot, message, args) => {

    let ascii = args.join(" ");
    if(!ascii) return message.channel.send("PLEASE ENTER A MESSAGE YOU WANT TO CONVERT TO ASCII**!**");

    if(ascii.length > 17) return message.channel.send("THE MESSAGE YOU ENTERED IS TOO LONG**!**");

    message.channel.send("GENERATING ASCII **...**").then((asciiMessage) => {
        
        figlet(ascii, function(err, data) {
            if(err) {
                
                return message.channel.send("THERE WAS A ERROR CREATING THE ASCII MESSAGE**!** PLEASE TRY AGAIN**!**");

            }
        
            asciiMessage.edit(data, {
                code: "md"
            });
        
        });

    });

}

module.exports.help = {
    name: "ascii"
}
