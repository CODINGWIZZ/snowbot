const Discord = require("discord.js");
const snow = require("../snow.json");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    let fancy = args.join(" ");
    if(!fancy) return message.channel.send("PLEASE ENTER A MESSAGE YOU WANT TO **F A N C Y!**");

    const splitting = {

        " " : "  "

    };

    message.channel.send(`**${message.author.username}** DID A FANCY MESSAGE THROGH **SNOW:**\n\n${fancy.split("").map(c => splitting[c] || c).join("  ")}`);

}

module.exports.help = {
    name: "fancy"
}
