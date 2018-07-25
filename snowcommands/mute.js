const Discord = require("discord.js");
const snow = require("../snow.json");

const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}mute`) {

        if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");

        if(!args[0]) return message.channel.send("PLEASE MENTION A USER THAT YOU WANT TO MUTE**!**");

        let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(mUser.id === message.author.id) return message.channel.send("YOU CAN NOT MUTE YOURSELF**!**");
        if(mUser.highestRole.position >= message.member.highestRole.position) return message.channel.send("YOU CAN NOT MUTE A MEMBER WHO HAS A HIGHER OR THE SAME ROLE AS YOU**!**");

        let muterole = message.guild.roles.find(`name`, "MUTED // ❆");
        if(!muterole) {

            try {

                muterole = await message.guild.createRole({
                    name: "MUTED // ❆",
                    color: "#65798d",
                    permissions: []
                })

                message.guild.channels.forEach(async (channel, id) => {

                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SPEAK: false
                    });

                });

            } catch (e) {

                console.log(e.stack);

            } 

        }

        if(mUser.roles.has(muterole.id)) return message.channel.send("THIS USER IS ALREADY MUTED**!**");

        let mutetime = args[0];
        if(!mutetime) return message.channel.send("SPECIFY A TIME**!**");

        await(mUser.addRole(muterole.id));
        message.channel.send(`${mUser} HAS BEEN **MUTED** FOR **${ms(ms(mutetime))}!**`);

        let muteEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setTimestamp()
        .setDescription("MUTE **❆**")
        .addField("USER", mUser)
        .addField("MODERATOR", message.author)
        .addField("CHANNEL", message.channel)
        .addField("DURATION", ms(ms(mutetime)))
        .setFooter("SNOW ❆", bot.user.displayAvatarURL);

        let snowlog = message.guild.channels.find(`name`, "snow");
        if(!snowlog) return;

        snowlog.send(muteEmbed);

        let autounmuteEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setTimestamp()
        .setDescription("UNMUTE **❆**")
        .addField("USER", mUser)
        .addField("MODERATOR", `<@${bot.user.id}>`)
        .addField("DURATION", ms(ms(mutetime)))
        .setFooter("SNOW ❆", bot.user.displayAvatarURL);

        let snowlog1 = message.guild.channels.find(`name`, "snow");
        if(!snowlog1) return;

        setTimeout(function () {

            if(!mUser.roles.has(muterole.id)) return;
            mUser.removeRole(muterole.id);
            snowlog1.send(autounmuteEmbed);

        }, ms(mutetime));

    }

}

module.exports.help = {
    name: "mute"
}