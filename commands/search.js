const Discord = require("discord.js");
const encode = require("strict-uri-encode")
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
  // GOOGLE | SEARCH COMMAND
  if(cmd === `${prefix}google` || cmd === `${prefix}search`) {
                                                              
  let google = encode(args.join(" "));
  if(!google) return message.channel.send("PLEASE ENTER A SEARCH QUERY**!**");
        
  message.channel.send("SEARCHING **...**").then((googleMessage) => {
               
  let googleLink = `https://google.com/search?q=${google}`;

  return googleMessage.edit(`<:SNOWCHECK:459111379899514887> **//** **FINISHED!**\n<${googleLink}>`);
            
    }); 
        
  }

}

module.exports.help = {
  name: "search", "google"
}
