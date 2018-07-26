const Discord = require("discord.js");
const snow = require("../snow.json");

const weather = require("weather-js");
const got = require("got");
const countries = require("country-data").countries.all;

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();
    
    if(cmd === `${prefix}weather`) {

        let location = args.join(" ");
        if(!location) return message.channel.send("PLEASE ENTER A LOCATION OR A ZIP CODE THAT YOU WANT TO CHECK THE WEATHER FOR**!**");

        let locationURL = (location) => `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22$%7B${encodeURIComponent(location)}%7D%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
        let res = await got(locationURL(args.join(" ")), { json: true });

        let celsius = (fahrenheit) => Math.round(((fahrenheit - 32) * 5) / 9);

        let weatherinfo = res.body.query.results.channel;

        weather.find({search: location, degreeType: "F"}, function(err, result) {

            message.channel.send("GENERATING WEATHER INFO **...**").then((weatherMessage) => {

                if(!res || !res.body || !res.body.query || !res.body.query.results || !res.body.query.results.channel) {

                    return weatherMessage.edit("COULDN'T CHECK WEATHER FOR THAT LOCATION**!**");
    
                }
    
                const countryinfo = countries.find(country => country.name === weatherinfo.location.country);
                const countryemoji = countryinfo ? countryinfo.emoji : "** **";
    
                let current = result[0].current;
                let thelocation = result[0].location;
    
                let weatherEmbed = new Discord.RichEmbed()
                .setColor(snow.blue)
                .setTimestamp()
                .setDescription(`WEATHER ☁\n${countryemoji} **//** \`${current.skytext}\``)
                .addField("TEMPERATURE", `${celsius(current.temperature)}**°C //** ${current.temperature}**°F**`, true)
                .addField("FEELS LIKE", `${celsius(current.feelslike)}**°C //** ${current.feelslike}**°F**`, true)
                .addField("WINDS", `*${current.winddisplay}* **>>** ${weatherinfo.wind.direction}**°**`, true)
                .addField("HUMIDITY", current.humidity + "**%**", true)
                .addField("SUNRISE", weatherinfo.astronomy.sunrise, true)
                .addField("SUNSET", weatherinfo.astromy.sunset, true)
                .setFooter(`${current.observationpoint} | SNOW ❆`, bot.user.displayAvatarURL);
    
                weatherMessage.edit(weatherEmbed);

            });

        });

    }

}

module.exports.help = {
    name: "weather"
}
