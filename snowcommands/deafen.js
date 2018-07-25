const Discord = require("discord.js");
const snow = require("../snow.json");

const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}deafen`) {

        if(!message.member.hasPermission("DEAFEN_MEMBERS")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");

        if(!args[0]) return message.channel.send("PLEASE MENTION A USER THAT YOU WANT TO DEAFEN**!**");

        let dUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
        if(!dUser) return message.channel.send("CAN'T FIND USER**!**"); 
        if(dUser.id === message.author.id) return message.channel.send("YOU CAN NOT DeAFEN YOURSELF**!**");
        if(dUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("THIS USER CAN'T BE DEAFAENED**!**");
        if(dUser.highestRole.position >= message.member.highestRole.position) return message.channel.send("YOU CAN NOT DEAFEN MEMBER WHO HAS A HIGHER OR THE SAME ROLE AS YOU**!**");

        let deafenrole = message.guild.roles.find(`name`, "DEAFENED // ❆");
        if(!deafenrole) {

            try {

                deafenrole = await message.guild.createRole({
                    name: "DEAFENED // ❆",
                    color: "#65798d",
                    permissions: []
                })

                message.guild.channels.forEach(async (channel, id) => {

                    await channel.overwritePermissons(deafenrole, {
                        SPEAK: false
                    });

                });

            } catch (e) {

                console.log(e.stack);

            }

        }

        if(dUser.roles.has(deafenrole.id)) return message.channel.send("THIS USER IS ALREADY DEAFENED**!**");

        let mutetime = args[0];
        if(!mutetime) return message.channel.send("SPECIFY A TIME**!**");

        await(dUser.addRole(deafenrole.id));
        message.channel.send(`${dUser} HAS BEEN **DEAFENED** FOR **${ms(ms(mutetime))}!**`);

        let deafenEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setTimestamp()
        .setDescription("DEAFEN **❆**")
        .addField("USER", dUser)
        .addField("MODERATOR", message.author)
        .addField("CHANNEL", message.author)
        .addField("DURATION", ms(ms(mutetime)))
        .setFooter("SNOW ❆", bot.user.displayAvatarURL);

        let snowlog = message.guild.channels.find(`name`, "snow");
        if(!snowlog) return;

        message.channel.send(deafenEmbed);

        let autoundeafenEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setTimestamp()
        .setDescription("UNDEAFEN **❆**")
        .addField("USER", dUser)
        .addField("MODERATOR", `<@${bot.user.id}>`)
        .addField("DURATION", ms(ms(mutetime)))
        .setFooter("SNOW ❆", bot.user.displayAvatarURL);

        let snowlog1 = message.guild.channels.find(`name`, "snow");
        if(!snowlog) return;

        setTimeout(function () {

            if(!dUser.roles.has(deafenrole.id)) return;
            dUser.removeRole(deafenrole.id);
            snowlog1.send(autoundeafenEmbed);

        }, ms(mutetime));

    }

}

module.exports.help = {
    name: "deafen"
}
