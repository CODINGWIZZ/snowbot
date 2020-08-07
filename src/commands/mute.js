const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async(bot, message, args) => {
  if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send(new Error("You don't have permission to use this command."));  
  if(!args[0]) return message.channel.send(new Error("User not entered."));

  let user = message.guild.member(bot.users.find(user => user.id === args[0]) || message.mentions.users.first() || message.guild.members.get(args[0]) || bot.users.find(user => user.username.toLowerCase() === args[0].toLowerCase()));
  if(!user) return message.channel.send(new Error("User not found."));
  
  if(user.id === message.author.id) return message.channel.send(new Error("You can't use this command on yourself."));

  let SNOW = message.guild.member(bot.users.find(user => user.id === bot.user.id));

  if(mUser.highestRole.position >= SNOW.highestRole.position) return message.channel.send("SNOW MUST HAVE A HIGHER OR THE SAME ROLE AS THE MEMBER YOU WANT TO MUTE**!**");

  let role = message.guild.roles.find(role => role.name === "MUTED");
  if(!role) {
    muterole = await message.guild.createRole({
      name: "Muted",
      permissions: []
    });

    message.guild.channels.forEach(async(channel, id) => {
      await channel.overwritePermissions(role, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
        SPEAK: false
      });
    });
  }

  if(role.roles.has(role.id)) return message.channel.send(new Error(user.tag + " is already muted."));

  let reason = args.slice(1).join(" ");
  if(!reason) reason = "None";

  role.addRole(muterole.id).then(() => {
    message.channel.send(
      new Discord.RichEmbed()
      .setColor(snow.blue)
      .setDescription("<@" + user.id + "> has been muted.")
    );
  });

  let muteEmbed = new Discord.RichEmbed()
  .setColor(snow.blue)
  .setTitle("Mute")
  .addField("User", "<@" + user.id + ">")
  .addField("Moderator", message.author)
  .addField("Reason", reason)
  .setFooter("SNOW", bot.user.displayAvatarURL);

  let channel = message.guild.channels.find(channel => channel.name === "snow");
  if(!channel) return;

  channel.send(muteEmbed);
}

module.exports.config = {
  name: "mute"
}