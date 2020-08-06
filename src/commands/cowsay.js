const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const cowsay = require("cowsay");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async(bot, message, args) => {
  let cowsayMessage = args.join(" ");
  if(!cowsayMessage) return message.channel.send(new Error("Message not entered."));

  let cowsayEmbed = new Discord.RichEmbed()
  .setColor(snow.blue)
  .setDescription("```" + cowsay.say({ text: cowsayMessage }) + "```")
  .setFooter("SNOW", bot.user.displayAvatarURL);

  message.channel.send(cowsayEmbed);
}

module.exports.config = {
  name: "cowsay"
}