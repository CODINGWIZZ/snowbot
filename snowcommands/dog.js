const Discord = require("discord.js");
const snow = require("../snow.json");

const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();
    
    if(cmd === `${prefix}dog`) {
    
    let { body } = await superagent
    .get("https://random.dog/woof.json");

    message.channel.send("GENERATING DOG IMAGE **...**").then((dogMessage) => {

        let dogEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription(":dog: **//** DOG **❆**")
        .setImage(body.url)

        dogMessage.edit(dogEmbed);

        }); 
    
    }
    
}

module.exports.help = {
    name: "dog"
}
