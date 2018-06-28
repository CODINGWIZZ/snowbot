const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
  if(cmd === `${prefix}fox`) {
  
  let foxlinkrandom = Math.floor((Math.random()) * 120);
  let foxlink = `http://randomfox.ca/images/${foxlinkrandom}.jpg`;
  
  let foxEmbed = new Discord.RichEmbed()
  .setColor(botconfig.blue)
  .setDescription(":fox: **//** FOX **❆**")
  .setImage(foxlink);
  
  message.channel.send(foxEmbed);
  
  }

}

module.exports.help = {
  name: "fox"
}
