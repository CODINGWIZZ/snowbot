const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const convert = require("color-contert");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
      // RANDOM COLOR COMMAND
    if(cmd === `${prefix}randomcolor`) {

    let color = "000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);}).toLocaleLowerCase();

    let randomColorEmbed = new Discord.RichEmbed()
    .setAuthor(`#${color.toUpperCase()}`, `https://dummyimage.com/250/${color}/&text=%20`)
    .setTitle("[INFORMATION]")
    .setColor(`${color}`)
    .setURL(`https://www.colorhexa.com/${color}`)
    .setDescription(`**RGB**\n${convert.hex.rgb(color)}\n\n**HSL**\n${convert.hex.hsl(color)}\n\n**CSS**\n${convert.hex.keyword(color).toUpperCase()}`)
    .setFooter("RANDOM COLOR | SNOW ❆", bot.user.displayAvatarURL);

    return message.channel.send(randomColorEmbed);

    }

}

module.exports.help = {
  name: "randomcolor"
} 
