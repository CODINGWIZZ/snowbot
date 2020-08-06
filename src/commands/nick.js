const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async(bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(new Error("You don't have permission to use this command."));

  if(!args[0]) return message.channel.send(new Error("User not entered."));

  let user = message.guild.member(bot.users.find(user => user.id === args[0]) || message.mentions.users.first() || message.guild.members.get(args[0]) || bot.users.find(user => user.username.toLowerCase() === args[0].toLowerCase()));
  if(!user) return message.channel.send(new Error("User not found."));

  let SNOW = message.guild.member(bot.users.find(user => user.id === "417210018576990208"));

  if(user.highestRole.position >= SNOW.highestRole.position) return message.channel.send(new Error("SNOW must have the same or a higher role than the user you want to nick."));

  let nickname = args.slice(1).join(" ").trim();
  if(!nickname) return message.channel.send(new Error("Nickname not entered."));

  message.guild.member(user).setNickname(nickname).then(() => {
    let nicknameEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription("Changed the nickname of **" + user.user.tag + "** to **" + nickname.split("*").join("\\*") + "**.");

    message.channel.send(nicknameEmbed);
  });
}

module.exports.config = {
  name: "nick"
}