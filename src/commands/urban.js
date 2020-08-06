const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const urban = require("relevant-urban");

const Error = require("../../config/functions/server/error.js");
const number = require("../../config/functions/number.js");

module.exports.run = async(bot, message, args) => {
  let word = args.join(" ");
  if(!word) return message.channel.send(new Error("Word not entered."));
      
  let res = await urban(word).catch(error => {
    return message.channel.send(new Error("Word not found."));
  });
  
  if(res.definition.length + res.example.length > 1000) return message.channel.send(new Error("The selected word is too long."));

  let urbanEmbed = new Discord.RichEmbed()
  .setColor(snow.blue)
  .setTitle(res.word)
  .addField("Definition", res.definition)
  .addField("Example", res.example)
  .addField("Upvotes", number(res.thumbsUp), true)
  .addField("Downvotes", number(res.thumbsDown), true)
  .addField("Written by", res.author)
  .setFooter("SNOW", bot.user.displayAvatarURL);
  
  message.channel.send(urbanEmbed);
}

module.exports.config = {
  name: "urban"
}