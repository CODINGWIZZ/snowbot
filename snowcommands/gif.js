const Discord = require("discord.js");
const snow = require("../snow.json");

const encode = require("strict-uri-encode");
const got = require("got");
const API_KEY = "dc6zaTOxFJmzC";

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    let gif = args.join(" ");
    if(!gif) return message.channel.send("PLEASE ENTER A GIF QUERY TO SEARCH FOR**!**");

    const res = await got(`http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${encode(gif)}`, { json: true });

    message.channel.send("SEARCHING GIFS **...**").then((gifMessage) => {

        if(!res || !res.body.data) return gifMessage.edit("FAILED TO LOAD GIF**!**");

        let gifEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("GIF **" + snow.snowflake + "**")
        .setImage(res.body.data.image_url);

        gifMessage.edit(gifEmbed);

    });

}

module.exports.help = {
    name: "gif"
}
