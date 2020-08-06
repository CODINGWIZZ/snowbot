const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const fetch = require("node-fetch");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async(bot, message, args) => {
  fetch("https://random.dog/woof.json")
  .then(res => res.json())
  .then(data => {
    if(!data.url) return message.channel.send(new Error("Image not found, please try again."));

    let dogEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setImage(data.url)
    .setFooter("SNOW", bot.user.displayAvatarURL);

    message.channel.send(dogEmbed);
  });
}

module.exports.config = {
  name: "dog"
}