const Discord = require("discord.js");
const snow = require("../snow.json");

const ascii = require("ascii-art")

module.exports.run = async (bot, message, args) => {

    let asciimessage = args.join(" ");
    if(asciimessage.length > 17) return message.channel.send("THE MESSAGE YOU'VE ENTERED IS TOO LONG**!**");
    if(!asciimessage) return message.channel.send("PLEASE ENTER A MESSAGE THAT YOU WANT TO CONVERT TO ASCII**!**");

    message.channel.send("GENERATING ASCII MESSAGE **...**").then((asciiMessage) => {

        ascii.font(asciimessage, "Doom", function(finished) {

            finished = finished.trimRight();

            asciiMessage.edit(finished, {
                code: "md"
            });

        });

    });

}

module.exports.help =  {
    name: "ascii"
}
