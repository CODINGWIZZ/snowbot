const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {

    if(!args[0]) return message.channel.send("PLEASE ENTER A ROLE YOU WANT TO GET INFO ABOUT**!**");

    let role = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(role => role.name.toUpperCase() === args[0].toUpperCase()) || message.guild.roles.find(role => role.id === args[0]);
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

    function numberseperator(num) {

        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

    }

    fetch(`http://www.thecolorapi.com/id?hex=${rolecolor}`)
        .then(res => res.json())
        .then((json) => {

            const roleinfoEmbed = new Discord.RichEmbed()
            .setColor(snow.blue)
            .setDescription("ROLEINFO " + snow.snowflake + "\n" + role + " ** // (** " + role.id + " **)**")
            .addField("POSITION", roleposition, true)
            .addField("ROLE MEMBERS", numberseperator(role.members.size, true))
            .addField("CREATED", role.createdAt.toDateString().toUpperCase() + " " + role.createdAt.toString().substr(16, 5) + " UTC", true)
            .addField("COLOR", json.hex.value + "\n" + json.rgb.value.toUpperCase())
            .addField("MENTIONABLE", truefalse[mentionable], true)
            .addField("MANAGED", truefalse[managed], true)
            .addField("HOIST", truefalse[hoist], true)
            .setFooter(`ROLEINFO ${role.name.toUpperCase()} | SNOW ` + snow.snowflake, bot.user.displayAvatarURL);
        
            message.channel.send(roleinfoEmbed);

        });
}

module.exports.config = {
    name: "roleinfo",
    usage: "s!roleinfo < ROLE >",
    permission: "NONE",
    aliases: "NONE"
}
