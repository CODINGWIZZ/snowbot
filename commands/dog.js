const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

 let prefix = botconfig.prefix;
 let messageArray = message.content.split(" ");
 let cmd = messageArray[0].toLocaleLowerCase();
 
 // DOG COMMAND
 if(cmd === `${prefix}dog`) {
  
  let { body } = await superagent
 .get("https://random.dog/woof.json");
        
 message.channel.send("GENERATING DOG IMAGAE **...**").then((dogImage) => {

 let dogEmbed = new Discord.RichEmbed()
 .setDescription(":dog: **//** DOG **❆**")
 .setColor(botconfig.blue)
 .setImage(body.url);

 dogImage.edit(dogEmbed);
        
 });

 } 

}

module.exports.help = {
  name: "dog"
}
