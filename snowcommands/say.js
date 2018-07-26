const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();
    
    if(cmd === `${prefix}say`) {

        if(!messag.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");

        let sayMessage = args.join(" ");
        if(!sayMessage) return message.channel.send("PLEASE ENTER A MESSAGE YOU WANT TO SAY THROUGH THE BOT**!**");

        message.delete();
        message.channel.send(`**${message.author.username}** SAID THROUGH THE BOT**:**\n\n${sayMessage}`);

    }

}

module.exports.help = {
    name: "say"
}
