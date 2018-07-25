const Discord = require("discord.js");
const snow = require("../snow.json");

const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

    const { body, header } = await superagent
    .get("https://aws.random.cat//meow");

    message.channel.send("GENERATING CAT IMAGE **...**").then((catMessage) => {

        let catEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription(":cat: **//** CAT **❆**")
        .setImage(body.file);

        catMessage.edit(catEmbed);

    });

}

module.exports.help = {
    name: "cat"
}
