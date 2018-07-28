const Discord = require("discord.js");
const snow = require("../snow.json");

const ascii = require("ascii-art");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}ascii`) {

        let ascifont = args.join(" ");
        if(!ascifont) return message.channel.send("PLEASE ENTER A MESSAGE THAT YOU WANT TO CONVERT TO ASCII**!**");

        message.channel.send("GENERATING ASCII MESSAGE **...**").then((asciiMessage) => {

            ascii.font(ascifont, "Doom", function(finished) {

                finished = finished.trimRight();

                if(finished.length > 2000) return asciiMessage.edit("THE ASCII MESSAGE YOU WANT TO DO IS TO LONG**!**");

                asciiMessage.edit(finished, {
                    code: "md"
                });

            });

        });

    }

}

module.exports.help = {
    name: "ascii"
}
