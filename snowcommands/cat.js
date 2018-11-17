const Discord = require("discord.js");
const snow = require("../snow.json");

const superagent = require("superagent");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    const { body, header } = await superagent
    .get("http://thecatapi.com/api/images/get?format=xml");

    message.channel.send("GENERATING CAT IMAGE **...**").then((catMessage) => {

        let catEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("CAT **" + snow.snowflake + "**")
        .setImage(body.url);


        catMessage.edit(catEmbed);

    });

}

module.exports.help = {
    name: "cat"
}
