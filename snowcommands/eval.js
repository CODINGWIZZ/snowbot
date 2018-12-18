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
        
      message.channel.sendCode("x1", clean(evaled));
    } catch (err) {
      message.channel.send("ERROR**!**");
    }
  
}

module.exports.help = {
    name: "eval"
}
