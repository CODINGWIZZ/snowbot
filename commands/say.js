const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let  cmd = messageArray[0].toLocaleLowerCase();
  
  // SAY A MESSAGE THROUGH THE BOT
  if(cmd === `${prefix}say`) {
        
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
  // if(!permissions.has("MANAGE_MESSAGES")) return message.channel.send("CANNOT DO THAT **-** MAKE SURE I HAVE THE RIGHT PERMISSIONS**!**");
  const sayMessage = args.join(" ");
  if(!args[0]) return message.channel.send("PLEASE ENTER A MESSAGE YOU WANT TO SAY THROUGH THE BOT**!**");

   message.delete();
   message.channel.send("**" + message.author.username + "** SAID THROUGH THE BOT**:**" + "\n\n" + sayMessage);
        
    }

}

module.exports.help = {
  name: "say"
}
