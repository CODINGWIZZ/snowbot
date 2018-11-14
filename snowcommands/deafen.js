const Discord = require("discord.js");
const snow = require("../snow.json");

const ms = require("ms");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("DEAFEN_MEMBERS")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");

    if(!args[0]) return message.channel.send("PLEASE MENTION A USER THAT YOU WANT TO DEAFEN AND THEN HOW LONG**!**");

    let dUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
    if(!dUser) return message.channel.send("CAN'T FIND USER**!**");
    if(dUser.id === message.author.id) return message.channel.send("YOU CAN NOT DEAFEN YOURSELF**!**");
    if(dUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("THIS USER CAN'T BE DEAFENED**!**");
    if(dUser.highestRole.position >= message.member.highestRole.position) return message.channel.send("YOU CAN NOT DEAFEN A MEMBER WHO HAS A HIGHER OR THE SAME ROLE AS YOU**!**");

    let deafenrole = message.guild.roles.find(`name`, "DEAFENED // " + snow.snowflake);
    if(!deafenrole) {

        try {

            deafenrole = await message.guild.createRole({
                name: "DEAFENED // " + snow.snowflake,
                color: "#65798d",
                permissions: []
            })

            message.guild.channels.forEach(async (channel, id) => {

                await channel.overwritePermissions(deafenrole, {
                    SPEAK: false
                });

            });

        } catch (e) {

            console.log(e.stack);

        }

    }

    if(dUser.roles.has(deafenrole.id)) return message.channel.send("THIS USER IS ALREADY DEAFENED**!**");

    let deafentime = args[1];
    if(!deafentime) return message.channel.send("PLEASE SPECIFY HOW LONG THIS USER SHOULD BE DEAFENED**!**");

    await(dUser.addRole(deafenrole.id));
    message.channel.send(`${dUser} HAS BEEN **DEAFENED** FOR **${ms(ms(deafentime))}!**`);
    message.dUser.setDeaf(true);

    let deafenEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setTimestamp()
    .setDescription("DEAFEN **" + snow.snowflake)
    .addField("USER", dUser)
    .addField("MODERATOR", message.author)
    .addField("CHANNEL", message.channel)
    .addField("DURATION", ms(ms(deafentime)))
    .setFooter("SNOW " + snow.snowflake, bot.user.displayAvatarURL);

    let snowlog = message.guild.channels.find(`name`, "snow");
    if(!snowlog) return;

    snowlog.send(deafenEmbed);

    let autoundeafenEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setTimestamp()
    .setDescription("UNDEAFEN **" + snow.snowflake + "**")
    .addField("USER", dUser)
    .addField("MODERATOR", `<@${bot.user.id}>`)
    .addField("DURATION", ms(ms(deafentime)))
    .setFooter("SNOW " + snow.snowflake, bot.uer.displayAvatarURL);

    let snowlog1 = message.guild.channels.find(`name`, "snow");
    if(!snowlog1) return;

    setTimeout(function () {

        if(!dUser.roles.has(deafenrole.id)) return;
        dUser.removeRole(deafenrole.id);
        message.dUser.setDeaf(false);
        snowlog1.send(autoundeafenEmbed);
 
    }, ms(deafentime));

}

module.exports.help = {
    name: "deafen"
}
