const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const moment = require("moment");

module.exports.run = async(bot, message, args) => {
  let date = moment.utc().format(`ddd DD MMM YYYY HH:mm:ss [UTC ${snow.dot} WEEK] WW`).toUpperCase();

  let dateEmbed = new Discord.RichEmbed()
  .setColor(snow.blue)
  .setDescription(date);

  message.channel.send(dateEmbed);
}

module.exports.config = {
  name: "date"
}