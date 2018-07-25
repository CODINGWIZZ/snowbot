const Discord = require("discord.js");
const snow = require("../snow.json");

const encode = require("strict-uri-encode");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}lmgtfy`) {

        let lmgtfy = encode(args.join(" "));
        if(!lmgtfy) return message.channel.send("PLEASE ENTER A QUESTION THAT YOU WANT TO MAKE WITH LMGTFY**!**");

        let lmgtfylink = `https://lmgtfy.com/?q=${lmgtfy}`;

        message.channel.send("GENERATING LMGTFY LINK **...**").then((lmgtfyMessage) => {

            lmgtfyMessage.edit("**FINISHED!**\n" + `<${lmgtfylink}>`);

        });

    }

}

module.exports.help = {
    name: "lmgtfy"
}
