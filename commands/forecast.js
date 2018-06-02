const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const weather = require("weather-js");
const countries = require("country-data").countries.all;
const got = require("got");

module.exports.run = async (bot, message, args) => {

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

        // CHECK FORECAST
        if(cmd === `${prefix}forecast`) { 
            
             if(!args[0]) return message.channel.send("PLEASE ENTER A CITY YOU WANT TO CHECK FORECAST FOR**!**");
            
            const forecastday = {

                Monday: "MONDAY",
                Tuesday: "TUESDAY",
                Wednesday: "WEDNESDAY",
                Thursday: "THURSDAY",
                Friday: "FRIDAY",
                Saturday: "SATURDAY",
                Sunday: "SUNDAY"

            };
            
            const weatherInfo = res.body.query.results.channel;
            const forecast = weatherInfo.item.forecast[0];

            weather.find({search: args.join(" "), degreeType: "F"}, function(err, result) {
                //if (err) message.channel.send(err);

            let makeURL1 = (city) => `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${encodeURIComponent(city)}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
            const res = await got(makeURL1(args.join(" ")), { json: true });
            
            message.channel.send("THE FORECAST IS BEING REQUESTED **...**").then((snow) => {

            if (!res || !res.body || !res.body.query || !res.body.query.results || !res.body.query.results.channel) {
                return message.channel.send("COULDN'T CHECK FORECAST**!**");
            }

            const city = args.join(" ");
            if(!city) return message.channel.send("PLEASE ENTER A CITY YOU WANT TO CHECK FORECAST FOR**!**");

            const countryInfo = countries.find(country => country.name === weatherInfo.location.country);
            const countryEmoji = countryInfo ? countryInfo.emoji : " ";

            const celsius = (fahrenheit) => Math.round(((fahrenheit - 32) * 5) / 9);

            var current = result[0].current;
            var location = result[0].location;

            let forecastEmbed = new Discord.RichEmbed()
            .setColor(botconfig.blue)
            .setAuthor("FORECAST   ☁")
            .setTitle(`${countryEmoji}\n/\n${result[0].location.name}`)
            .setTimestamp()
            .setDescription("**" + forecastday[result[0].forecast[1].day] + "**\nLOW: " + celsius(result[0].forecast[1].low) + "**°C / ** "+ result[0].forecast[1].low + "**°F**\nHIGH: " + celsius(result[0].forecast[1].high) + "**°C / **" + result[0].forecast[1].high + "**°F**\n`" + result[0].forecast[1].skytextday + "`\n\n" + "**" + forecastday[result[0].forecast[2].day] + "**\nLOW: " + celsius(result[0].forecast[2].low) + "**°C / **" + result[0].forecast[2].low + "**°F**\nHIGH: " + celsius(result[0].forecast[2].high) + "**°C / **" + result[0].forecast[2].high + "**°F**\n`" + result[0].forecast[2].skytextday + "`\n\n**" + forecastday[result[0].forecast[3].day] + "**\nLOW: " + celsius(result[0].forecast[3].low) + "**°C / **" + result[0].forecast[3].low + "**°F**\nHIGH: " + celsius(result[0].forecast[3].high) + "**°C / **" + result[0].forecast[3].high + "**°F**\n`" + result[0].forecast[3].skytextday + "`\n\n**" + forecastday[result[0].forecast[4].day] + "**\nLOW: " + celsius(result[0].forecast[4].low) + "**°C / **" + result[0].forecast[4].low +"**°F**\nHIGH: " + celsius(result[0].forecast[4].high) + "**°C / **" + result[0].forecast[4].high + "**°F**\n`" + result[0].forecast[4].skytextday + "`")
            .setFooter("FORECAST | SNOW ❆", bot.user.displayAvatarURL);

            snow.edit(forecastEmbed);

         });
            
     });

    }

}

module.exports.help = {
    name: "forecast"
}
