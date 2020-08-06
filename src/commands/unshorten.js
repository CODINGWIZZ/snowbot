const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const unshort = require("url-unshorten");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async(bot, message, args) => {
  function checkURL(string) {
    let res = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return res.test(string);
  }

  let unshorten = args[0];
  if(!unshorten) return message.channel.send(new Error("URL not entered."));

  if(checkURL(unshorten) === false) return message.channel.send(new Error("URL not valid."));

  unshort(unshorten).then(data => {
    let unshortenEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription(data.unshorten);

    message.channel.send(unshortenEmbed);
  });
}

module.exports.config = {
  name: "unshorten"
}