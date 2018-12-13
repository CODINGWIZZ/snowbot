const Discord = require("discord.js");
const snow = require("../snow.json");

const fetch = require("snekfetch");

module.exports.run = async (bot, message, args) => {

    let airport = args[0];
    if(!airport) return message.channel.send("PLEASE ENTER A ICAO**!**");

    fetch.get(`https://avwx.rest/api/metar/${airport}`).then((metar) => {
        
        if(metar.startsWith("error:")) return message.channel.send("PLEASE ENTER A VALID ICAO CODE**!**");
    
        let decodeEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("METAR **" + airport.toUpperCase() + " " + snow.snowflake + "**\n" + metar.body.Sanitized)
        .setFooter("METAR | SNOW " + snow.snowflake, bot.user.displayAvatarURL);
        
        message.channel.send(decodeEmbed);
    
    });
    
}

module.exports.help = {
    name: "metar"
}
