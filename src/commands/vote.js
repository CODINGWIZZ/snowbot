const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async(bot, message, args) => {    
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Error("You don't have permission to use this command."));
  
  let agree = bot.emojis.get("577094131847921664");
  let neutral = bot.emojis.get("577094190245216266");
  let disagree = bot.emojis.get("577094131466108955");

  let vote = args.join(" ");
  if(!vote) return message.channel.send(new Error("Vote message not entered."));

  if(vote.length > 250) return message.channel.send(new Error("Vote message can't be longer than 250 characters."));

  let voteEmbed = new Discord.RichEmbed()
  .setColor(snow.blue)
  .setDescription(vote)
  .setFooter(message.author.tag, message.author.avatarURL);

  let voteMessage = await message.channel.send(voteEmbed);
    
  await voteMessage.react(agree);
  await voteMessage.react(neutral);
  await voteMessage.react(disagree);
}

module.exports.config = {
  name: "vote"
}