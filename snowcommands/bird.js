const Discord = require("discord.js");
const snow = require("../snow.json");

const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

    let { body } = await superagent
    .get(`http://shibe.online/api/birds`);
    
    message.channel.send("GENERATING DOG IMAGE **...**").then((birdMessage) => {
    
        let birdEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("BIRD **" + snow.snowflake + "**")
        .setImage(body.url);
        
        birdMessage.edit(birdEmbed);
    
    });

}

module.exports.help = {
    name: "bird"
}
