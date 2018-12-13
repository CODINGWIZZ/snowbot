const Discord = require("discord.js");
const snow = require("../snow.json");

const fetch = require("snekfetch");

module.exports.run = async (bot, message, args) => {

    let airport = args[0];
    if(!airport) return message.channnel.send("PLEASE ENTER A ICAO**!**");

    fetch.get(`https://avwx.rest/api/metar/${airport}`).then((decode) => {
    
        let decodeEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("METAR **" + airport.toUpperCase() + " " + snow.snowflake)
        .addField("ALTIMETER", decode.Altimeter)
        .addField("CLOUDS", decode.Cloud-List)
        .addField("FLIGHT RULES", decode.Flight-Rules)
        .addFiled("TEMPERATURE // DEW POINT", decode.Temperature + " **//**" + decode.Dewpoint)
        .addField("VISIBILITY", decode.Visibility)
        .addField("WINDS", decode.Wind-Direction + " **/** " + decode.Wind-Speed + "**KTS**")
        .addFooter("METAR | SNOW " + snow.snowflake, bot.user.displayAvatarURL);
        
        message.channel.send(decodeEmbed);
    
    )}
    
}

module.exports.help = {
    name: "decode"
}
