const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async(bot, message, args) => {
  if(message.author.id !== "297832577782382592") return message.channel.send(new Error("You have to be a SNOW developer to use this command."));
  
  function clean(text) {
    if(typeof(text) === "string") {
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    } else {
      return text;
    }
  }
  
  try {
    let code = args.join(" ");
    if(!code) return message.channel.send(new Error("Code not entered."));
    
    let evaled = eval(code);
    
    if(typeof evaled !== "string") evaled = require("util").inspect(evaled);
    
    let evalEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setTitle("Eval")
    .addField("Input", "```" + code + "```")
    .addField("Output", "```" + evaled + "```")
    .setFooter("SNOW", bot.user.displayAvatarURL);
    
    message.channel.send(evalEmbed);
  } catch(err) {
    let errorevalEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setTitle("Eval")
    .addField("Input", "```" + args.join(" ") + "```")
    .addField("Output", "```" + clean(err) + "```")
    .setFooter("SNOW", bot.user.displayAvatarURL);
    
    message.channel.send(errorevalEmbed);
  }
}

module.exports.config = {
  name: "eval"
}