const Discord = require("discord.js");
const snow = require("../snow.json");

const fetch = require("snekfetch");

module.exports.run = async (bot, message, args) => {

    let airport = args[0];
    if(!airport) return message.channel.send("PLEASE ENTER A ICAO**!**");

    fetch.get(`https://avwx.rest/api/metar/${airport.toUpperCase()}`).then((metar, err) => {
 
        let decodeEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("METAR **" + snow.snowflake + "**\n" + metar.body.Sanitized.replace(airport.toUpperCase(), "**" + airport.toUpperCase() + "**"))
        .setFooter(`METAR ${airport.toUpperCase()} | SNOW ` + snow.snowflake, bot.user.displayAvatarURL);
        
        message.channel.send(decodeEmbed);
    
    }) catch (err) {
        
        return message.channel.send("COULDN'T LOAD THE METAR FOR `" + airport.toUpperCase() + "`");
        
    }
    
}

module.exports.help = {
    name: "metar"
}
