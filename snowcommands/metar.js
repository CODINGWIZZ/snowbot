const Discord = require("discord.js");
const snow = require("../snow.json");

const fetch = require("snekfetch");

module.exports.run = async (bot, message, args) => {

    let airport = args[0].toUpperCase();
    if(!airport) return message.channel.send("PLEASE ENTER A ICAO**!**");

    fetch.get(`https://avwx.rest/api/metar/${airport}`).then((metar) => {
        
        message.channel.send("SEARCHING FOR WEATHER BY THAT SPECIFIED ICAO**!**").then((metarMessage) => {
            
            let decodeEmbed = new Discord.RichEmbed()
            .setColor(snow.blue)
            .setDescription("METAR **" + snow.snowflake + "**\n" + metar.body.Sanitized.replace(airport.toUpperCase(), "**" + airport.toUpperCase() + "**"))
            .setFooter(`METAR ${airport.toUpperCase()} | SNOW ` + snow.snowflake, bot.user.displayAvatarURL);
        
            metarMessage.edit(decodeEmbed);
            
        });
    
    });
    
}

module.exports.help = {
    name: "metar"
}
