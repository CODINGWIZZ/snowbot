const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {
  
    if(message.author.id !== "297832577782382592") return;
    
    function clean(text) {
      
        if(typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
          return text;
      
    }
    
    try {
      let code = args.join(" ");
      var evaled = eval(code);
      
      if(typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      
      let evalEmbed = new Discord.RichEmbed()
      .setColor(snow.blue)
      .setDescription("EVAL **" + snow.snowflake + "**")
      .addField("INPUT", "```" + code + "```")
      .addField("OUTPUT", "```" + evaled + "```")
      .setFooter("EVAL | SNOW " + snow.snowflake, bot.user.displayAvatarURL);
      
      message.channel.send(evalEmbed);
      
    } catch (err) {
      message.channel.send("ERROR**!** " + clean(err).toUpperCase() + "**!**");
    }
  
}

module.exports.help = {
    name: "eval"
}
