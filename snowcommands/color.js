const Discord = require("discord.js");
const snow = require("../snow.json");

const convert = require("color-convert");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    let color = args[0];
    if(color.starsWith("#")) {
    
       color.replace("#", "");
       
    };
        
    if(!color) return message.channel.send("PLEASE ENTER A HEX COLOR THAT YOU WANT TO CHECK**!**");

    if(color.length > 6) return message.channel.send("PLEASE ENTER A VALID HEX CODE**!**");
    if(color.length < 6) return message.channel.send("PLEASE ENTAR A VALID HEX COLOR**!**");

    let colorEmbed = new Discord.RichEmbed()
    .setColor(color)
    .setAuthor(`#${color.toUpperCase()}`, `https://dummyimage.com/250/${color}/&text=%20`)
    .setDescription(`[[**INFORMATION**]](https://colorhexa.com/${color})` + "\n\n" + `**RGB**\n${convert.hex.rgb(color)}\n\n**HSL**\n${convert.hex.hsl(color)}\n\n**CSS**\n${convert.hex.keyword(color).toUpperCase()}`)
    .setFooter("COLOR | SNOW " + snow.snowflake, bot.user.displayAvatarURL);

    message.channel.send(colorEmbed);

}

module.exports.help = {
    name: `color`
}
