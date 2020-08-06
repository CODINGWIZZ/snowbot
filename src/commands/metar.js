const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const fetch = require("node-fetch");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async(bot, message, args) => {
  let airport = args[0];
  if(!airport) return message.channel.send(new Error("ICAO not entered."));

  fetch(`https://metar.vatsim.net/${airport}`)
  .then(res => res.text())
  .then(data => {
    if(data === "") return message.channel.send(new Error("ICAO not valid."));

    let metarEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription(data.split("\n")[0]);
    
    message.channel.send(metarEmbed);
  });
}

module.exports.config = {
  name: "metar"
}
