const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const weather = require("weather-js");
const countries = require("country-data").countries.all;
const got = require("got");

module.exports.run = async (bot, message, args) => {

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    // WEATHER COMMAND
    if(cmd === `${prefix}weather`) {
        
        const city = args.join(" ");
        if(!city) return message.channel.send("PLEASE ENTER A CITY YOU WANT TO CHECK WEATHER FOR**!**");   

        const makeURL = (city) => `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${encodeURIComponent(city)}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
        const celsius = (fahrenheit) => Math.round(((fahrenheit - 32) * 5) / 9); 
            
        const res = await got(makeURL(args.join(" ")), { json: true });
    
        // const weatherEmojiText = {
    
        //     32: "SUNNY",
        //     31: "CLEAR",
        //     34: "MOSTLY SUNNY",
        //     26: "CLOUDY",
        //     28: "MOSTLY CLOUDY"
    
        // };
    
        // const weatherEmoji = {
    
        //     32: ":sunny:",
        //     31: ":sun_with_face:",
        //     34: ":white_sun_small_cloud:",
        //     26: ":cloud:",
        //     28: ":white_sun_cloud:"
    
        // };
        
        const weatherInfo = res.bod.query.results.channel;
        const forecast = weatherInfo.item.forecast[0];
    
        weather.find({search: args.join(" "), degreeType: "F"}, function(err, result) {
    
        message.channel.send("THE WEATHER IS BEING REQUESTED **...**").then((snow) => {
    
        if (!res || !res.body || !res.body.query || !res.body.query.results || !res.body.query.results.channel) {
        return snow.edit("COULDN'T CHECK WEATHER**!**");
        }
    
        // if(!city) return message.channel.send("PLEASE ENTER A CITY YOU WANT TO CHECK WEATHER FOR**!**");
    
        const countryInfo = countries.find(country => country.name === weatherInfo.location.country);
        const countryEmoji = countryInfo ? countryInfo.emoji : "** **";
    
        //if (err) message.channel.send(err);
    
        var current = result[0].current;
        var location = result[0].location;
    
        let weatherEmbed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setAuthor("WEATHER  ☁")
        .setTimestamp()
        .setDescription(`${countryEmoji} **>** ` + "\`" + current.skytext + "\`")
        .addField("TEMPERATURE", `${celsius(current.temperature)}**°C** **/** ${weatherInfo.item.condition.temp}**°F**`, true)
        .addField("FEELS LIKE", `${celsius(current.feelslike)}**°C** **/** ${current.feelslike}**°F**`, true)
        .addField("WINDS", `*${current.winddisplay}*` +  "  **>**  " + `*${weatherInfo.wind.direction}* ` + "**°**", true)
        .addField("HUMIDITY", `${current.humidity}**%**`, true)
        .addField("SUNRISE", `*${weatherInfo.astronomy.sunrise}*`, true)
        .addField("SUNSET", `*${weatherInfo.astronomy.sunset}*`, true)
        .setFooter(`${current.observationpoint} | SNOW ❆`, bot.user.displayAvatarURL);
    
        snow.edit(weatherEmbed);
    
    });
    
    });
    
        }

}

module.exports.help = {
    name: "weather"
}
