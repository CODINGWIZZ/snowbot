const Discord = require("discord.js");

const fetch = require("node-fetch");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async(bot, message, args) => {
  if(!args[0]) return message.channel.send(new Error("No HEX color entered."));

  let color = args[0].replace("#", "");

  fetch(`http://www.thecolorapi.com/id?hex=${color}`)
  .then(res => res.json())
  .then(data => {
    if(typeof data.rgb.r !== "number" || typeof data.rgb.g !== "number" || typeof data.rgb.b !== "number" || color.length > 6) return message.channel.send(new Error("HEX color not valid."));

    let colorEmbed = new Discord.RichEmbed()
    .setColor(data.hex.value)
    .setTitle(data.hex.value)
    .setThumbnail(`https://dummyimage.com/250/${data.hex.clean}/?text=%20`)
    .addField("RGB", data.rgb.value)
    .addField("HSL", data.hsl.value)
    .addField("Color", data.name.value)
    .setFooter("SNOW", bot.user.displayAvatarURL);

    message.channel.send(colorEmbed);
  });
}

module.exports.config = {
  name: "color"
}