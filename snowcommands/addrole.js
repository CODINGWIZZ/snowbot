const Discord = require("discord.js");
const snow = require("../snow.json");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");

    if(!args[0]) return message.channel.send("PLEASE MENTION A USER THAT YOU WANT TO ADD A ROLE TO**!**");

    let arUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
    if(!arUser) return message.channel.send("CAN'T FIND USER**!**");

    let role = args.slice(1).join(" ");
    if(!role) return message.channel.send("PLEASE SPECIFY A ROLE**!**");

    let arRole = message.guild.roles.find(`name`, role);
    if(!arRole) return message.channel.send("CAN'T FIND ROLE**!**");

    if(arUser.highestRole.position >= message.member.highestRole.position) return message.channel.send("YOU CAN NOT ADD A ROLE TO A MEMBER WITH A HIGHER OR THE SAME ROLE AS YOU**!**");
    if(arUser.roles.has(arRole.id)) return message.channel.send("THAT USER ALREADY HAS THAT ROLE**!**");

    await(arUser.addRole(arRole.id)).then(() => {

        message.channel.send(`<@${arUser.id}> HAS BEEN ADDED TO THE **${arRole}** ROLE**!**`);

        let addroleEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("ADD ROLE **" + snow.snowflake + "**")
        .setTimestamp()
        .addField("USER", arUser)
        .addField("ROLE", arRole)
        .addField("MODERATOR", message.author)
        .addField("CHANNEL", message.channel)
        .setFooter("SNOW " + snow.snowflake, bot.user.displayAvatarURL);

        let snowlog = message.guild.channels.find(`name`, "snow");
        if(!snowlog) return;

        snowlog.send(addroleEmbed);

    });

}

module.exports.help = {
    name: "addrole"
}
