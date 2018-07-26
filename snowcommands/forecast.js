const Discord = require("discord.js");
const snow = require("../snow.json");

const weather = require("weather-js");
const got = require("got");
const countries = require("country-data").countries.all;

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}forecast`) {

        const location = args.join(" ");
        if(!location) return message.channel.send("PLEASE ENTER A CITY OR A ZIP CODE THAT YOU WANT TO CHECK FORECAST FOR**!**");

        let makeURL = (location) => `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22$%7B${encodeURIComponent(location)}%7D%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
        const res = await got(makeURL(location), { json: true });

        const weatherinfo = res.body.query.results.channel;
        const forecastday = weatherinfo.item.forecast[0];

        weather.find({search: location, degreeType: "F"}, function(err, result) {

            message.channel.send("GENERATING FORECAST INFORMATION **...**").then((forecastMessage) => {

                if(!res || !res.body.query || !res.body.query.results || !res.body.query.results.channel) {

                    return forecastMessage.edit("COULDN'T CHECK FORECAST**!**");
                    
                }

                const countryinfo = countries.find(country => country.name === weatherinfo.location.country);
                const countryemoji = countryinfo ? countryinfo.emoji : "** **";

                const celsius = (fahrenheit) => Math.round(((fahrenheit - 32) * 5) / 9);

                let forecastEmbed = new Discord.RichEmbed()
                .setColor(snow.blue)
                .setTimestamp()
                .setDescription("FORECAST ☁\n" + `${countryemoji} **//** ${result[0].location.name}\n\n` + "**" + forecastday[result[0].forecast[1].day] + "**\nLOW: " + celsius(result[0].forecast[1].low) + "**°C // ** "+ result[0].forecast[1].low + "**°F**\nHIGH: " + celsius(result[0].forecast[1].high) + "**°C // **" + result[0].forecast[1].high + "**°F**\n`" + result[0].forecast[1].skytextday + "`\n\n" + "**" + forecastday[result[0].forecast[2].day] + "**\nLOW: " + celsius(result[0].forecast[2].low) + "**°C // **" + result[0].forecast[2].low + "**°F**\nHIGH: " + celsius(result[0].forecast[2].high) + "**°C // **" + result[0].forecast[2].high + "**°F**\n`" + result[0].forecast[2].skytextday + "`\n\n**" + forecastday[result[0].forecast[3].day] + "**\nLOW: " + celsius(result[0].forecast[3].low) + "**°C // **" + result[0].forecast[3].low + "**°F**\nHIGH: " + celsius(result[0].forecast[3].high) + "**°C // **" + result[0].forecast[3].high + "**°F**\n`" + result[0].forecast[3].skytextday + "`\n\n**" + forecastday[result[0].forecast[4].day] + "**\nLOW: " + celsius(result[0].forecast[4].low) + "**°C // **" + result[0].forecast[4].low +"**°F**\nHIGH: " + celsius(result[0].forecast[4].high) + "**°C // **" + result[0].forecast[4].high + "**°F**\n`" + result[0].forecast[4].skytextday + "`")
                .setFooter("FORECAST | SNOW ❆", bot.user.displayAvatarURL);

                forecastMessage.edit(forecastEmbed);

            });

        });

    }

}

module.exports.help = {
    name: "forecast"
}
