const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async(bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Error("You don't have permission to use this command."));

  if(!args[0]) return message.channel.send(new Error("User not entered."));

  let user = message.guild.member(bot.users.find(user => user.id === args[0]) || message.mentions.users.first() || message.guild.member.get(args[0]) || bot.users.find(user => user.username.toLowerCase() === args[0].toLowerCase()));
  if(!user) return message.channel.send(new Error("User not found."));

  if(user.id === message.author.id) return message.channel.send(new Error("You can't use this command on yourself."));

  let SNOW = message.guild.member(bot.users.find(user => user.id === bot.user.id));

  if(user.highestRole.position >= SNOW.highestRole.position) return message.channel.send(new Error("SNOW must have the same or a  higher role than the user you want to warn."));

  let reason = args.slice(1).join(" ");
  if(!reason) reason = "None";

  let warnUserEmbed = new Discord.RichEmbed()
  .setColor(snow.blue)
  .setTitle("Warn")
  .setDescription("You've been warned in " + message.guild.name + ".")
  .addField("Reason", reason)
  .setFooter("SNOW", bot.user.displayAvatarURL);

  user.send(warnUserEmbed);

  let warnEmbed = new Discord.RichEmbed()
  .setColor(snow.blue)
  .setTitle("Warn")
  .addField("User", user)
  .addField("Warned by", message.author)
  .addField("Warned in", message.channel)
  .addField("Reason", reason)
  .setFooter("SNOW", bot.user.displayAvatarURL);

  let channel = message.guild.channels.find(channel => channel.name === "snow");
  if(!channel) return;

  channel.send(warnEmbed);
}

module.exports.config = {
  name: "warn"
}