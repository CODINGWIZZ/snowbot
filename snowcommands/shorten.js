    const Discord = require("discord.js");
    const snow = require("../snow.json");

    const shorten = require("isgd");

    module.exports.run = async (bot, message, args) => {

        let prefix = snow.prefix;
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0].toLocaleLowerCase();

        if(cmd === `${prefix}shorten`) {

            let link = args.join(" ");
            if(!link) return message.channel.send("PLEASE ENTER A LINK THAT YOU WANT TO SHORTEN**!**");

            shorten.shorten(link, function(res) {

                message.channel.send("SHORTEN LINK **...**").then((shortenMessage) => {

                    if(res.startsWith("Error:")) return message.channel.send("PLEASE ENTER A VALID LINK**!**");

                    message.channel.send("**FINISHED!**\n" + `<${res}>`);

                });

            });
    
        }

    }

    module.exports.help = {
        name: "shorten"
    }
