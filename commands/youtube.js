const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const encode = require("strict-uri-encode");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
      // YOUTUBE SEARCH COMMAND
    if(cmd === `${prefix}youtube`) {

        let search = encode(args.join(" "));
        if(!search) return message.channel.send("PLEASE ENTER A YOUTUBE SEARCH QUERY**!**");

        message.channel.send("SEARCHING **...**").then((youtubeMessage) => {

        youtubeLink = `https://youtube.com/results?search_query=${search}`;

        return youtubeMessage.edit("*FINISHED!**" + "\n" + `<${youtubeLink}>`);
            
        });

    }

}

module.exports.help = {
  name: "youtube"
}
