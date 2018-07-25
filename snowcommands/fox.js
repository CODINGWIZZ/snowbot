const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}fox`) {

        let randomfox = Math.floor(((Math.random()) * 120) + 1);
        let foxlink = `https://randomfox.ca/images/${randomfox}.jpg`;

        let foxEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription(":fox: **//** FOX **❆**")
        .setImage(foxlink)

        message.channel.send(foxEmbed);

    }

}

module.exports.help = {
    name: "fox"
}
