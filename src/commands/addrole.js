const Discord = require("discord.js");
const snow = require("../../config/snow.json");

module.exports.run = async(bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You don't have permission to use this command.");

  if(!args[0]) return message.channel.send("No user entered to add a role to.");

  let arUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
  if(!arUser) return message.channel.send("User not found.");

  if(!args[1]) return message.channel.send("No role entered you want to add to a user.");

  let role = message.mentions.roles.first() || message.guild.roles.get(args.slice(1).join(" ")) || message.guild.roles.find(role => role.name.toUpperCase() === args.slice(1).join(" ").toUpperCase());
  if(!role) return message.channel.send("CAN'T FIND ROLE**!**");

  if(arUser.highestRole.position >= message.member.highestRole.position) return message.channel.send("YOU CAN'T ADD A ROLE TO A MEMBER WITH A HIGHER OR THE SAME ROLE AS YOU**!**");
  if(arUser.roles.has(role.id)) return message.channel.send("THAT USER ALREADY HAS THAT ROLE**!**");

  arUser.addRole(role.id).then(() => {
    message.channel.send(`<@${arUser.id}> HAS BEEN ADDED TO THE ${role} ROLE**!**`);

    let addroleEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription("ADD ROLE **" + snow.snowflake + "**")
    .setTimestamp()
    .addField("USER", arUser)
    .addField("ROLE", role)
    .addField("MODERATOR", message.author)
    .addField("CHANNEL", message.channel)
    .setFooter("SNOW " + snow.snowflake, bot.user.displayAvatarURL);

    let snowlog = message.guild.channels.find(`name`, "snow");
    if(!snowlog) return;

    snowlog.send(addroleEmbed);
  });
}

module.exports.config = {
  name: "addrole"
}