const Discord = require("discord.js");
const snow = require("../snow.json");

const fetch = require("snekfetch");

module.exports.run = async(bot, message, args) => {

    fetch.get("http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en").then((thequote) => {
    
        if(thequote.body.quoteText === undefined) {
        
            return message.channel.send("COULDN'T LOAD THE QUOTE**!** PLEASE TRY AGAIN**!**");
        
        }
        
        let quoteEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription(thequote.body.quoteText + "\n\n" + "**─ " + thequote.body.quoteAuthor.toUpperCase() + "**")
        .setFooter("QUOTE | SNOW " + snow.snowflake, bot.user.displayAvatarURL);
        
        message.channel.send(quoteEmbed);
    
    });

}

module.exports.help = {
    name: "quote"
}
