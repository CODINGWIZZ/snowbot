const Discord = require("discord.js");
const encode = require("strict-encode-uri");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
      // LMGTYFY COMMAND
    if(cmd === `${prefix}lmgtfy`) {

        let question = encode(args.join(" "));
        if(!question) return message.channel.send("PLEASE ENTER A QUESITON YOU WANT TO MAKE WITH LMGTFY**!**");

        message.channel.send("GENERATING **...**").then((loadingMessage) => {

        let link = `https://lmgtfy.com/?q=${question}`;
            
        return loadingMessage.edit("**FINISHED!**" + "\n" + `<${link}>`);
     
        });

    }
  
}

module.exports.help = {
  name: "lmgtfy"
}
