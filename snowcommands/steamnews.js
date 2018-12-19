const Discord = require("discord.js");
const snow = require("../snow.json");

const Parser = require("rss-parser");
const parser = new Parser();

module.exports.run = async (bot, message, args) => {

    let feed = await parser.parseURL("https://store.steampowered.com/feeds/news.xml");
    
    let steamnewsEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription("STEAM NEWS **" + snow.snowflake + "\n" + feed.body.item.title + "**\n" + feed.body.item.content)
    .setFooter("STEAM NEWS | SNOW " + snow.snowflake, bot.user.displayAvatarURL);
    
    message.channel.send(steamnewsEmbed);

}

module.exports.help = {
    name: "steamnews"
}
