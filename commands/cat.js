const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
  // CAT COMMAND
  if(cmd === `${prefix}cat`) {
        
  message.channel.send("GENERATING CAT IMAGE **...**").then((catImage) => {

  const { body, header } = await superagent
  .get(`http://aws.random.cat//meow`);
    
  const catEmbed = new Discord.RichEmbed()
  .setColor(botconfig.blue)
  .setDescription("**CAT ❆**")
  .setImage(body.file);

  catImage.edit(catEmbed);
        
  });

  }

}

module.exports.help = {
  name: "cat"
}
