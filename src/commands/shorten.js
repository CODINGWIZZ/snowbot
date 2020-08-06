const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const isgd = require("isgd");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async(bot, message, args) => {
  let link = args[0];
  if(!link) return message.channel.send(new Error("URL not entered."));

  isgd.shorten(link, function(res) {
    if(res.startsWith("Error:")) return message.channel.send(new Error("URL not valid."));
    
    let shortenEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription(res);

    message.channel.send(shortenEmbed);
  });
}

module.exports.config = {
  name: "shorten"
}