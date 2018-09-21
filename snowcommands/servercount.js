const Discord = require("discord.js");
const snow = require("../snow.json");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    let presences = message.guild.presences.map(st => st.status);

    let onlinemembers = 0;
    let idlemembers = 0;
    let dndmembers = 0;

    for(const i in presences) {

        if(presences[i] === "online") {

            onlinemembers += 1;

        }

    }

    for(const i in presences) {

        if(presences[i] === "idle") {

            idlemembers += 1;

        }

    }

    for(const i in presences) {

        if(presences[i] === "dnd") {

            dndmembers += 1;

        }

    }

    let servercountEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription("SERVERCOUNT **" + snow.snowflake + "**")
    .addField("TOTAL MEMBERS", message.guild.memberCount)
    .addField("ONLINE MEMBERS", onlinemembers + idlemembers + dndmembers);

    message.channel.send(servercountEmbed);

}

module.exports.help = {
    name: "servercount"
}
