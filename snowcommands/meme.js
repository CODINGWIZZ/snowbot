const Discord = require("discord.js");
const snow = require("../snow.json");

const fetch = require("snekfetch");

module.exports.run = async (bot, message, args) => {

    fetch.get(`https://api-to.get-a.life/meme`).then((meme) => {
 
        let memeEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("MEME **" + snow.snowflake + "**")
        .setImage(meme.body.url)
        .setFooter(`MEME | SNOW ` + snow.snowflake, bot.user.displayAvatarURL);
        
        message.channel.send(memeEmbed);
    
    });
    
}

module.exports.help = {
    name: "meme"
}