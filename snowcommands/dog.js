const Discord = require("discord.js");
const snow = require("../snow.json");

const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

    let { body } = await superagent
    .get(`https://random.dog/woof.json`);

    message.channel.send("GENERATING DOG IMAGE **...**").then((dogMessage) => {

        let dogEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("DOG **" + snow.snowflake + "**")
        .setImage(body.url);

        dogMessage.edit(dogEmbed);

    });

}

module.exports.help = {
    name: "dog"
}
