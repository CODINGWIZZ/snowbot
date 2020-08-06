const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const fetch = require("node-fetch");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async(bot, message, args) => {
  fetch("https://randomfox.ca/floof")
  .then(res => res.json())
  .then(data => {
    if(!data.image) return message.channel.send(new Error("Image not found, please try again."));

    let foxEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setImage(data.image)
    .setFooter("SNOW", bot.user.displayAvatarURL);
  
    message.channel.send(foxEmbed);
  });      
}

module.exports.config = {
  name: "fox"
}