const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
      // SEARCH AFTER A HEX COLOR
    if(cmd === `${prefix}color`) {

    let color = args[0].replace("#", "");

    if(!color) return message.channel.send("COULDN'T FIND COLOR**!**");

    let colorEmbed = new Discord.RichEmbed()
    .setColor(`${color}`)
    .setAuthor(`#${color.toUpperCase()}`, `https://dummyimage.com/250/${color}/&text=%20`)
    .setTitle("[INFORMATION]")
    .setURL(`https://colorhexa.com/${color}`)
    .setDescription(`**RGB**\n${convert.hex.rgb(color)}\n\n**HSL**\n${convert.hex.hsl(color)}\n\n**CSS**\n${convert.hex.keyword(color).toUpperCase()}`)
    .setFooter("COLOR | SNOW ❆", bot.user.displayAvatarURL);

    return message.channel.send(colorEmbed);

    }
  
}

module.exports.help = {
  name: "color"
}
