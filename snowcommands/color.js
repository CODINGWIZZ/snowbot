const Discord = require("discord.js");
const snow = require("../snow.json");

const convert = require("color-convert");

module.exports.run = async (bot, message, args) => {
    
    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}color`) {

        let color = args[0];
        if(!color) return message.channel.send("PLEASE ENTER A HEX COLOR YOU WANT TO CHECK**!**");
        
        if(color.startsWith("#")) color.replace("#", "");
    
//         if(!color.startsWith("#")) return message.channel.send("PLEASE ENTER A VALID HEX COLOR WITH A `#` IN THE BEGINNING**!**");
    
       // if(color.length > 6) return message.channel.send("PLEASE ENTER A VALID HEX COLOR**!**");
       // if(color.length < 6) return message.channel.send("PLEASE ENTER A VALID HEX COLOR**!**");
    
        let colorEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setAuthor(`${color.toUpperCase()}`, `https://dummyimage.com/250/${colorcheck}/&text=%20`)
        .setDescription(`[[**INFORMATION**]](https://colorhexa.com/${colorcheck})` + "\n\n" + `**RGB**\n${convert.hex.rgb(color)}\n\n**HSL**\n${convert.hex.hsl(color)}\n\n**CSS**\n${convert.hex.keyword(color).toUpperCase()}`)
        .setFooter("COLOR | SNOW ❆", bot.user.displayAvatarURL);
    
        message.channel.send(colorEmbed);

    }
    
} 

module.exports.help = {
    name: "color"
}
