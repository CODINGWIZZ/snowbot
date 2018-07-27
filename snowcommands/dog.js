const Discord = require("discord.js");
const snow = require("../snow.js");

const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

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

module.exports.help = {
    name: "dog"
}
