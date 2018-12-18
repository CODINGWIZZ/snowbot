const Discord = require("discord.js");
const snow = require("../snow.json");

const ascii = require("ascii-art")

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    let asciimessage = args.join(" ");
    if(!asciimessage) return message.channel.send("PLEASE ENTER A MESSAGE THAT YOU WANT TO CONVERT TO ASCII**!**");

    message.channel.send("GENERATING ASCII MESSAGE **...**").then((asciiMessage) => {

        ascii.font(asciimessage, "Doom", function(finished) {

            finished = finished.trimRight();

            if(finished.length > 270) return message.channel.send("THE ASCII MESSAGE YOU WANT TO DO IS TO LONG**!**");

            asciiMessage.edit(finished, {
                code: "md"
            });

        });

    });

}

module.exports.help = {
    name: "ascii"
}
