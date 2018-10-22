const Discord = require("discord.js");
const snow = require("../snow.json");

const weather = require("weather-js");
const countries = require("country-data").countries.all;
const got = require("got");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    let location = args.join(" ");
    if(!location) return message.channel.send("PLEASE ENTER A CITY OR A ZIP CODE THAT YOU WANT TO CHECK FORECAST ABOUT**!**");

    let locationURL = location => `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22$%7B${encodeURIComponent(location)}%7D%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
    let res = await got(locationURL(location), { json: true });

    let weatherinfo = res.body.query.results.channel;
    let forecast = weatherinfo.item.forecast[0];

    weather.find({search: location, degreeType: "F"}, function(err, result) {

        message.channel.send("GENERATING FORECAST INFORMATAION **...**").then((forecastMessage) => {

            if(!res || !res.body || !res.body.query || !res.body.query.results || !res.body.query.results.channel) {

                return forecastMessage.edit("COULDN'T FIND FORECAST**!**");

            }

            const countryinfo = countries.find(country => country.name === weatherinfo.location.country);
            const countryemoji = countryinfo ? countryinfo.emoji : "** **";

            let celsius = (fahrenheit) => Math.round(((fahrenheit - 32) * 5) / 9);

            let forecastEmbed = new Discord.RichEmbed()
            .setColor(snow.blue)
            .setTimestamp()
            .setDescription("FORECAST :cloud:\n" + `${countryemoji} **//** ${result[0].location.name}\n\n` + "**" + result[0].forecast[1].day + "// TODAY**\nLOW**:** " + celsius(result[0].forecast[1].low) + "**°C // ** "+ result[0].forecast[1].low + "**°F**\nHIGH**:** " + celsius(result[0].forecast[1].high) + "**°C // **" + result[0].forecast[1].high + "**°F**\n`" + result[0].forecast[1].skytextday.toUpperCase() + "`\n\n" + "**" + result[0].forecast[2].day + "**\nLOW**:** " + celsius(result[0].forecast[2].low) + "**°C // **" + result[0].forecast[2].low + "**°F**\nHIGH**:** " + celsius(result[0].forecast[2].high) + "**°C // **" + result[0].forecast[2].high + "**°F**\n`" + result[0].forecast[2].skytextday.toUpperCase() + "`\n\n**" + result[0].forecast[3].day + "**\nLOW**:** " + celsius(result[0].forecast[3].low) + "**°C // **" + result[0].forecast[3].low + "**°F**\nHIGH**:** " + celsius(result[0].forecast[3].high) + "**°C // **" + result[0].forecast[3].high + "**°F**\n`" + result[0].forecast[3].skytextday.toUpperCase() + "`\n\n**" + result[0].forecast[4].day + "**\nLOW**:** " + celsius(result[0].forecast[4].low) + "**°C // **" + result[0].forecast[4].low +"**°F**\nHIGH**:** " + celsius(result[0].forecast[4].high) + "**°C // **" + result[0].forecast[4].high + "**°F**\n`" + result[0].forecast[4].skytextday.toUpperCase() + "`")
            .setFooter("FORECAST | SNOW " + snow.snowflake, bot.user.displayAvatarURL);

            forecastMessage.edit(forecastEmbed);

        });

    });

}

module.exports.help = {
    name: "forecast"
}
