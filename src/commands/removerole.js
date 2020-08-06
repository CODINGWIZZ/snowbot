const Discord = require("discord.js");
const snow = require("../../config/snow.json");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("YOU DON'T HAVE PERMISSIONS TO DO THAT**!**");

    if(!args[0]) return message.channel.send("PLEASE MENTION A USER THAT YOU WANT TO REMOVE A ROLE FROM**!**");

    let rrUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
    if(!rrUser) return message.channel.send("CAN'T FIND USER**!**");
    
    if(!args[1]) return message.channel.send("PLEASE ENTER A ROLE YOU WANT TO ADD TO THAT SPECIFIC USER**!**");

    let role = message.mentions.roles.first() || message.guild.roles.get(args.slice(1).join(" ")) || message.guild.roles.find(role => role.name.toUpperCase() === args.slice(1).join(" ").toUpperCase());
    if(!role) return message.channel.send("CAN'T FIND ROLE**!**");;

    if(rrUser.highestRole.position >= message.member.highestRole.position) return message.channel.send("YOU CAN'T REMOVE A ROLE FROM A MEMBER WITH A HIGHER OR THE SAME ROLE AS YOU**!**");
    if(!rrUser.roles.has(role.id)) return message.channel.send("THAT USER DOESN'T HAVE THAT ROLE**!**");

    await(rrUser.removeRole(role.id)).then(() => {

        message.channel.send(`<@${rrUser.id}> HAS BEEN REMOVED FROM THE ${role} ROLE**!**`);

        let removeroleEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("REMOVE ROLE **" + snow.snowflake + "**")
        .setTimestamp()
        .addField("USER", rrUser)
        .addField("ROLE", role)
        .addField("MODERATOR", message.author)
        .addField("CHANNEL", message.channel)
        .setFooter("SNOW " + snow.snowflake, bot.user.displayAvatarURL);

        let snowlog = message.guild.channels.find(`name`, "snow");
        if(!snowlog) return;

        snowlog.send(removeroleEmbed);

    });

}

module.exports.config = {
    name: "removerole",
    usage: "s!removerole < @USER > < ROLE >",
    permission: "MANAGE_MEMBERS",
    aliases: "NONE"
}