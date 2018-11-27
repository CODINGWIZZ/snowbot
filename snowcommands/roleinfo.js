const Discord = require("discord.js");
const snow = require("../snow.json");

const convert = require("color-convert");

module.exports.run = async(bot, message, args) => {

    let therole = args.join(" ");
    if(!therole) return message.channel.send("PLEASE SPECIFY A ROLE YOU WANT TO CHECK INFORMATION ABOUT**!**");
    
    let role = message.guild.roles.find(`name`, therole);
    if(!role) return message.channel.send("CAN'T FIND ROLE**!**");
    
    let rolecolor = role.hexColor.replace("#", "");
    
    let mentionable = role.mentionable;
    let managed = role.managed;
    let hoist = role.hoist;
    
    let truefalse = {
        
        true: "TRUE",
        false: "FALSE"
        
    };
    
    let roleinfoEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription("ROLEINFO **" + snow.snowflake + "**\n**" + role + "**")
    .addField("ID", role.id, true)
    .addField("ROLE MEMBERS", role.members.size)
    .addField("POSITION", message.guild.roles.size - role.calculatedPosition - 1 + " **/** " + message.guild.roles.size, true)
    .addField("COLOR", "**#**" + rolecolor.toUpperCase() + "\n**RGB(**" + convert.hex.rgb(rolecolor) + "**)**", true)
    .addField("CREATED AT", role.createdAt.toDateString().toUpperCase(), true)
    .addField("MENTIONABLE // MANAGED // HOIST", truefalse[mentionable] + " **//** " + truefalse[managed] + " **//** " + truefalse[hoist], true)
    .setFooter("ROLEINFO | SNOW " + snow.snowflake, bot.user.displayAvatarURL);
    
    message.channel.send(roleinfoEmbed);

}

module.exports.help = {
    name: "roleinfo"
}
