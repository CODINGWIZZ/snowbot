const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const moment = require("moment");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async(bot, message, args) => {
  let online = bot.emojis.get("616306084566663188");
  let idle = bot.emojis.get("616307564484886550");
  let dnd = bot.emojis.get("616307564426035229");
  let invisible = bot.emojis.get("616306853340774421");
  
  let status = {
    online: `${online} Online`,
    idle: `${idle} Idle`,
    dnd: `${dnd} Do Not Disturb`,
    offline: `${invisible} Invisible`
  }
  
  let user = bot.users.find(user => user.id === args[0]) || message.mentions.users.first() || message.guild.members.get(args[0]) || bot.users.find(user => user.username.toLowerCase() === args.join(" ").replace(/ .*/, "").toLowerCase());
  
  if(!args[0]) user = message.author;
  if(!user) return message.channel.send(new Error("User not found"));

  let member = message.guild.member(user);

  let roles = member.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => role);  
  if(roles.length < 1) roles = ["None"];
  
  let nickname = (member.nickname !== null ? member.nickname : "None");
  
  let voiceChannel = (member.voiceChannel ? member.voiceChannel : "None");

  let highestRole = member.highestRole ? member.highestRole : "None";

  let userinfoEmbed = new Discord.RichEmbed()
  .setColor(snow.blue)
  .setTitle("Userinfo")
  .setThumbnail(user.avatarURL || null)
  .addField("User", user.tag)
  .addField("ID", user.id)
  .addField("Nickname", nickname)
  .addField("Roles (" + member.roles.size - 1 + ")", roles.join(" "))
  .addField("Highest role", highestRole)
  .addField("Presence", `${status[user.presence.status]}`)
  .addField("Voicechannel", voiceChannel)
  .addField("Created", moment.utc(user.createdAt).format("ddd DD MMM YYYY HH:mm [UTC]").toUpperCase())
  .addField("Joined", moment.utc(member.joinedAt).format("ddd DD MMM YYYY HH:mm [UTC]").toUpperCase())
  .setFooter("SNOW", bot.user.displayAvatarURL);

  message.channel.send(userinfoEmbed);
}

module.exports.config = {
  name: "user"
}