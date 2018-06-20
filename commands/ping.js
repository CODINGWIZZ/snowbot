const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
  // PING COMMAND
  if(cmd === `${prefix}ping`) {

  const ping = bot.pings[0];
        
  message.channel.send('PINGING **...**').then((pingMessage) => {
            
  pingMessage.edit("THE PING IS `" + ping + "ms`**!**");

  });
                                                     
 }
  
}

module.exports.help = {
  name: "ping"
}
