const Discord = require("discord.js");
const snow = require("../snow.json");

const weather = require("weather-js");
const countries = require("country-data").countries.all;
const got = require("got");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    let location = args.join(" ");
    if(!location) return message.channel.send("PLEASE ENTER A LOCATION OR A ZIP CODE THAT YOU WANT TO CHECK WEATHER ABOUT**!**");

    let locationURL = location => `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22$%7B${encodeURIComponent(location)}%7D%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
    let res = await got(locationURL(location), { json: true });

    let celsius = (fahrenheit) => Math.round(((fahrenheit - 32) * 5) / 9);

    let weatherinfo = res.body.query.results.channel;

    weather.find({search: location, degreeType: "F"}, function(err, result) {

        message.channel.send("GENERATING WEATHER INFO **...**").then((weatherMessage) => {

            if(!res || !res.body || !res.body.query || !res.body.query.results || !res.body.query.results.channel) {

                return weatherMessage.edit("COULDN'T CHECK WEATHER FOR THAT LOCATION**!**");

            }

            const countryinfo = countries.find(country => country.name === weatherinfo.location.country);
            const countryemoji = countryinfo ? countryinfo.emoji : "** **";

            let thecurrent = result[0].current;
            let thelocation = result[0].location;

            let weatherEmbed = new Discord.RichEmbed()
            .setColor(snow.blue)
            .setTimestamp()
            .setDescription(`WEATHER ☁\n${countryemoji} **//** \`${thecurrent.skytext.toUpperCase()}\``)
            .addField("TEMPERATURE", `${celsius(thecurrent.temperature)}**` + "°C //** " + thecurrent.temperature + "**°F**", true)
            .addField("FEELS LIKE", `${celsius(current.feelslike)}**` + "°C //** " + thecurrent.feelslike + "**°F**", true)
            .addField("WINDS", `*${thecurrent.winddisplay}* **>>** ${weatherinfo.wind.direction}**°**`, true)
            .addField("HUMIDITY", thecurrent.humidity + "**%**", true)
            .addField("SUNRISE", weatherinfo.astronomy.sunrise, true)
            .addField("SUNSET", weatherinfo.astronomy.sunset, true)
            .setFooter(`${thecurrent.observationpoint} | SNOW ❆`, bot.user.displayAvatarURL);

            weatherMessage.edit(weatherEmbed);

        });

    });

}

module.exports.help = {
    name: "weather"
}
