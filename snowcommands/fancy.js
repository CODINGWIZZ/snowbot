const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}fancy`) {

        let fancy = args.join(" ");
        if(!fancy) return message.channel.send("PLEASE ENTER A MESSAGE YOU WANT TO FANCY**!**");

        const splitting = {

            " " : "  "

        };

        message.channel.send(`**${message.author.username}** DID A MESSAGE THROUGH THE BOT**:**\n\n${fancy.split("").map(c => splitting[c] || c).join("  ")}`);

    }

}

module.exports.help = {
    name: "fancy"
}