const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const fetch = require("node-fetch");

module.exports.run = async(bot, message, args) => {
  let color = "000000".replace(/0/g, function() { return (~~(Math.random() * 16)).toString(16); }).toLocaleLowerCase();

  fetch(`http://www.thecolorapi.com/id?hex=${color}`)
  .then(res => res.json())
  .then(data => {
    let randomcolorEmbed = new Discord.RichEmbed()
    .setColor(data.hex.value)
    .setTitle(data.hex.value)
    .setThumbnail(`https://dummyimage.com/250/${data.hex.clean}/?text=%20`)
    .addField("RGB", data.rgb.value)
    .addField("HSL", data.hsl.value)
    .addField("Color", data.name.value)
    .setFooter("SNOW", bot.user.displayAvatarURL);

    message.channel.send(randomcolorEmbed);
  });
}

module.exports.config = {
  name: "randomcolor"
}