const Discord = require("discord.js");
const shorten = require("isgd");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
    // SHORTEN COMMAND
    if(cmd === `${prefix}shorten`) {

    if(!args[0]) return message.channel.send("PLEASE ENTER A LINK TO SHORTEN**!**");

    message.channel.send("GENERATING LINK **...**").then((message) => {

    if(!args[1]) {

        shorten.shorten(args[0], function(snowdone) {
        if (snowdone.startsWith('Error:')) return message.edit("PLEASE ENTER A VALID URL**!**"); 

        message.edit(`**FINISHED!**\n<${snowdone}>`);

    });

    }
});

    }

}

module.exports.help = {
  name: "shorten"
}
