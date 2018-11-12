const Discord = require("discord.js");
const snow = require("../snow.json");

const got = require("got");
const encode = require("strict-uri-encode");

module.exports.run = async (bot, message, args) => {

    let country = encode(args.join(" "));
    if(!country) return message.channel.send("PLEASE ENTER A COUNTRY YOU WANT TO SEE INFO ABOUT**!**");
    
    let countryURL = country => `https://restcountries.eu/rest/v2/name/${country}`
    let res = await got(countryURL(country), { json: true });
    
    message.channel.send("GENRERATING COUNTRY INFO **...**").then((countryMessage) => {
    
        if(!res) return countryMessage.edit("COULDN'T FIND THAT COUNTRY IN THE DATABASE**!**");
        
        let countryEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setTitle(res.name, res.flag)
        .addField("CAPITAL", res.capital)
        .addField("POPULATION", res.population)
        .addField("AREA", res.area)
        .addField("TIMEZONE**S**", res.timezones)
        .addField("NATIVE NAME", res.nativeName)
        .addField("DENONYM", res.denonym)
        .addField("REGION", res.region)
        .addField("SUBREGION", res.subregion)
        .setFooter("COUNTRYINFO | SNOW " + snow.snowflake, bot.user.displayAvatarURL);
        
        message.channel.send(countryEmbed);
    
    });

}

module.exports.help = {
    name: "countryinfo"
}
