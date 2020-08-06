const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async(bot, message, args) => {  
  let avatar = bot.users.find(user => user.id === args[0]) || message.mentions.users.first() || message.guild.members.get(args[0]) || bot.users.find(user => user.username.toLowerCase() === args.join(" ").replace(/ .*/, "").toLowerCase());
  
  if(!args[0]) avatar = message.author;
  if(!avatar) return message.channel.send(new Error("User not found."));

  if(!avatar.avatarURL) return message.channel.send(new Error("This user doesn't have an avatar."));

  let avatarEmbed = new Discord.RichEmbed()
  .setColor(snow.blue)
  .setImage(avatar.avatarURL)
  .setFooter(avatar.tag, avatar.displayAvatarURL);

  message.channel.send(avatarEmbed);
}

module.exports.config = {
  name: "avatar"
}
