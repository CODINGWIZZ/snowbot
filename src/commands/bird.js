const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const fetch = require("node-fetch");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async(bot, message, args) => {
  fetch("https://api.alexflipnote.dev/birb")
  .then(res => res.json())
  .then(data => {
    if(!data.file) return message.channel.send(new Error("Image not found, please try again."));

    let birdEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setImage(data.file)
    .setFooter("SNOW", bot.user.displayAvatarURL);

    message.channel.send(birdEmbed);
  });
}

module.exports.config = {
  name: "bird"
}