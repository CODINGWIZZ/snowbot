const Discord = require("discord.js");
const snow = require("../snow.json");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    let randomfox = Math.floor(((Math.random()) * 120) + 1);
    let foxlink = `https://randomfox.ca/images/${randomfox}.jpg`;
    
    message.channel.send("GENERATING FOX IMAGE **...**").then((foxMessage => {
        
        let foxEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("FOX **" + snow.snowflake + "**")
        .setImage(foxlink);

        foxMessage.edit(foxMessage);
        
    });

}

module.exports.help = {
    name: "fox"
}
