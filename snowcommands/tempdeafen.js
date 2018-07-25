const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}tempdeafen`) {

        if(!message.member.hasPermission("DEAFAEN_MEMBERS")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");

        if(!args[0]) return message.channel.send("PLEASE MENTION A USER THAT YOU WANT TO  TEMPDEAFEN**!**");

        let tdUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!tdUser) return message.channel.send("CAN'T FIND USER**!**");
        if(tdUser.id === message.author.id) return message.channel.send("YOU CAN NOT TEMPDEAFEN YOURSELF**!**");
        if(tdUser.highestRole.position >= message.member.highestRole.position) return message.channel.send("YOU CAN NOT TEMPDEAFEN A MEMBER WHO HAS A HIGHER OR THE SAME ROLE AS YOU**!**");

        let tempdeafenrole = message.guild.roles.find(`name`, "DEAFENED // ❆");
        if(!tempdeafenrole) {

            try {

                tempdeafenrole = await message.guild.createRole({
                    name: "DEAFENED // ❆",
                    color: "#65798d",
                    permissions: []
                })

                message.guild.channels.forEach(async (channel, id) => {

                    await channel.overwritePermissions(tempdeafenrole, {
                        SPEAK: false
                    });

                });

            } catch(e) {

                console.log(e.stack);

            }

        }

        if(tdUser.roles.has(tempdeafenrole.id)) return message.channel.send("THIS USER IS ALREADY DEAFENED**!**");

        await(tdUser.addRole(tempdeafenrole.id));
        message.channel.send(`${tdUser} HAS BEEN TEMPDEAFENED**!**`);

        let tempdeafenEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setTimestamp()
        .setDescription("TEMPDEAFEN **❆**")
        .addField("USER", tdUser)
        .addField("MODERATOR", message.author)
        .addField("CHANNEL", message.channel)
        .setFooter("SNOW ❆", bot.user.displayAvatarURL);

        let snowlog = message.guild.channels.find(`name`, "snow");
        if(!snowlog) return;

        snowlog.send(tempdeafenEmbed);

    }

}

module.exports.help = {
    name: "tempdeafen"
}
