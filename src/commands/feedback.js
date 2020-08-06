const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const Error = require("../../config/functions/server/error.js");
const ID = require("../../config/functions/id.js");

module.exports.run = async(bot, message, args) => {
  let feedback = args.join(" ");
  if(!feedback) return message.channel.send(new Error("Feedback not entered."));

  if(feedback.length > 250) return message.channel.send(new Error("Feedback can't exceed 250 characters."));

  let id = ID();

  let feedbackEmbed = new Discord.RichEmbed()
  .setColor(snow.blue)
  .setTitle("Feedback")
  .addField("Written by", "<@" + message.author.id + ">")
  .addField("Feedback", feedback)
  .addField("ID", "`" + id + "`")
  .setFooter("SNOW", bot.user.displayAvatarURL);

  let channel = bot.channels.find(channel => channel.id === "483909335513301002");
  
  channel.send(feedbackEmbed).then(() => {
    let feedbackresultEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription("Thanks for submitting the feedback.\nID: `" + id + "`");

    message.channel.send(feedbackresultEmbed);
  });
}

module.exports.config = {
  name: "feedback"
}