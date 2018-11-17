const Discord = require("discord.js");
const snow = require("../snow.json");

const fetch = require("snekfetch");

module.exports.run = async(bot, message, args) => {

    fetch.get("https://api.wheretheiss.at/v1/satellites/25544").then((iss) => {
    
        let issEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("ISS **" + snow.snowflake + "**")
        .addField("LOCATION", iss.body.latitude + ", " + iss.body.longitude)
        .addField("ALTITUDE", iss.body.altitude)
        .addField("VISIBILITY", iss.body.visibility.toUpperCase())
        .addField("ISS ON MAP", `https://maps.google.com/maps?q=${iss.body.latitude},${iss.body.longitude}`)
        .setFooter("ISS | SNOW " + snow.snowflake, bot.user.displayAvatarURL);
        
        message.channel.send(issEmbed);
    
    });

}

module.exports.help = {
    name: "iss"
}
