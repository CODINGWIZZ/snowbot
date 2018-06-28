const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const translate = require("google-translate-api");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
  if(cmd === `${prefix}translate`) {
  
    let transto = args[0];
    if(!transto) return message.channel.send("PLEASE ENTER A LANGUAGE SHORTEN TO `2` CHARACTERS AND THEN THE TRANSLATE MESSAGE**!**")
    let transtext = args.slice(1).join(" ");
    if(!transtext) return message.channel.send("PLEASE ENTER WHAT YOU WANT TO TRANSLATE**!**");
    
    translate(transtext, {to: transto}).then(res => {
    
    let translateEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setDescription("TRANSLATE **❆**")
    .addField("INPUT", transtext)
    .addField("OUTPUT", res.text)
    .setFooter("TRANSLATE | SNOW ❆", bot.user.displayAvatarURL);
    
    message.channel.send(translateEmbed);
    
    }).catch(err => {
      return message.channel.send("`" + transto.toUpperCase() +"` IS NOT VALID**!**");
    });
  
  }

}

module.exports.help = {
  name: "translate"
}
