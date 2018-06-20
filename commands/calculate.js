const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();
    
    // CALCULATE
    if(cmd === `${prefix}calculate` || cmd === `${prefix}calculator`) {

    const question = args.join(" ");
    if(!question) return message.channel.send("YOU MUST PROVIDE A EQUATION IF YOU WANT TO CACULATE**!**");

    let answer = math.eval(question);
    try {
    } catch (err) {
        return message.channel.send("INVILID MATH EQUATION**!**");
    }

    let mathEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setDescription("**CALCULATOR ❆**")
    .addField("EQUATION", `\`\`\`${question}\`\`\``)
    .addField("ANSWER", `\`\`\`${answer}\`\`\``)
    .setFooter("CALCULATOR | SNOW ❆", bot.user.displayAvatarURL);

    message.channel.send(mathEmbed);
        
  }
  
}

module.exports.help = {
  name: "calculate"
}
