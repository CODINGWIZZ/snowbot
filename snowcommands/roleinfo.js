const Discord = require("discord.js");
const snow = require("../snow.json");

const convert = require("color-convert");

module.exports.run = async (bot, message, args) => {

    if(!args[0]) return message.channel.send("PLEASE ENTER A ROLE YOU WANT TO GET INFO ABOUT**!**");

    let role = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(role => role.name === args[0]);
    if(!role) return message.channel.send("CAN'T FIND ROLE**!**");

    let roleposition = message.guild.roles.size - role.calculatedPosition + " **/** " + message.guild.roles.size;

    let rolecolor = role.hexColor.replace("#", "");
    
    let mentionable = role.mentionable;
    let managed = role.managed;
    let hoist = role.hoist;

    let truefalse = {
        true: "TRUE",
        false: "FALSE"
    };

    const roleinfoEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription("ROLEINFO **" + snow.snowflake + "\n" + role + " (** " + role.id + " **)**")
    .addField("POSITION", roleposition, true)
    .addField("ROLE MEMBERS", role.members.size, true)
    .addField("CREATED AT", role.createdAt.toDateString().toUpperCase(), true)
    .addField("COLOR", "**#**" + rolecolor.toUpperCase() + "\n**RGB(**" + convert.hex.rgb(rolecolor) + "**)**", true)
    .addField("MENTIONABLE // MANAGED // HOIST", truefalse[mentionable] + " **//** " + truefalse[managed] + " **//** " + truefalse[hoist], true)
    .setFooter("ROLEINFO | SNOW " + snow.snowflake, bot.user.displayAvatarURL);

    message.channel.send(roleinfoEmbed);

}

module.exports.help = {
    name: "roleinfo"
}
