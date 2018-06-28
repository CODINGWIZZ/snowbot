const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const translate = require("google-translate-api");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
  if(cmd === `${prefix}translate`) {
  
    let tansto = args[0];
    let transtext = args.slice(1).join(" ");
    
    translate(transtext, {to: transto}).then(res => {
    
    let translateEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setDescription("TRANSLATE **❆**")
    .addField("INPUT", transtext)
    .addField("OUTPUT", res.text)
    .addField("TRANSLATE | SNOW ❆", bot.user.displayAvatarURL);
    
    message.channel.send(translateEmbed);
    
    }).catch(err => {
      console.log(err);
    });
  
  }

}

module.exports.help = {
  name: "translate"
}
