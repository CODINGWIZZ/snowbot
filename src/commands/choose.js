const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async(bot, message, args) => {
  let options = args.join(" ").replace(/\*/g, "");
  if(!options) return message.channel.send(new Error("No options entered."));

  if(!args[1]) return message.channel.send(new Error("Please enter at least two options."));
  if(!options.includes(",")) return message.channel.send(new Error("Please add a `,` for every option."));

  let split = options.split(",");
  let result = split[Math.floor(Math.random() * split.length)].trim();

  let chooseEmbed = new Discord.RichEmbed()
  .setColor(snow.blue)
  .setTitle("Choose")
  .setDescription(split.length + " options entered")
  .addField("Result", "I choose **" + result + "**")
  .setFooter("SNOW", bot.user.displayAvatarURL);

  message.channel.send(chooseEmbed);
}

module.exports.config = {
  name: "choose"
}