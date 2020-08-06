const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const translate = require("@k3rn31p4nic/google-translate-api");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async (bot, message, args) => {
  let language = args[0];
  if(!language) return message.channel.send(new Error("Language to be translated to is not entered."));

  let text = args.slice(1).join(" ");
  if(!text) return message.channel.send(new Error("No text entered."));

  translate(text, { to: language }).then(res => {
    let translateEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setTitle("Translate")
    .addField("Input", "```" + text + "```")
    .addField("Output", "```" + res.text + "```")
    .setFooter("SNOW", bot.user.displayAvatarURL);

    message.channel.send(translateEmbed);
  }).catch(err => {
    return message.channel.send(new Error("Language not found."));
  });
}

module.exports.config = {
  name: "translate"
}