const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
      // FANCY MESSAGE (;
    if(cmd === `${prefix}fancy`) {
     
       if(!args.join(" ")) return message.channel.send("PLEASE ENTER A MESSAGE YOU WANT ME TO FANCY**!**");
        
       const splitting = {
         
           " " : "  "
           
       };
        
        message.channel.send ("**" + message.author.username + "** DID A FANCY MESSAGE THROUGH THE BOT**:**\n\n" + args.join(" ").split("").map(c => splitting[c] || c).join(" "));
      
    }
  
}

module.exports.help = {
  name: "fancy"
} 
