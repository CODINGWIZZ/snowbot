const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}tempmute`) {

        if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");

        if(!args[0]) return message.channel.send("PLEASE MENTION A USER THAT YOU WANT TO TEMOMUTE**!**");

        let tmUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!tmUser) return message.channel.send("CAN'T FIND USER**!*");
        if(tmUser === message.author.id) return message.channel.send("YOU CAN NOT TEMPMUTE YOURSELF**!**");
        if(tmUser.highestRole.position >= message.member.highestRole.position) return message.channel.send("YOU CAN NOT TEMPMUTE A MEMBER WHO HAS A HIGHER OR THE SAME ROLE AS YOU**!**");

        let tempmuterole = message.guild.roles.find(`name`, "MUTED // ❆");
        if(!tempmuterole) {

            try {

                tempmuterole = await message.guild.createRole({
                    name: "MUTED // ❆",
                    color: "#65798d",
                    permissions: []
                })

                message.guild.channels.forEach(async (channel, id) => {

                    await channel.overwritePermissions(tempmuterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SPEAK: false
                    });

                });

            } catch (e) {

                console.log(e.stack);

            }

        }

        if(tmUser.roles.has(tempmuterole.id)) return message.channel.send("THIS USER IS ALREADY MUTED**!**");

        awaitU(tmUser.addRole(tempmuterole.id));
        message.channel.send(`${tmUser} HAS BEEN **TEMPMUTED!**`);

        let tempmuteEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setTimestamp()
        .setDescription("TEMPMUTE **❆**")
        .addField("USER", tmUser)
        .addField("MODERATOR", message.author)
        .addField("CHANNEL", massage.channel)
        .setFooter("SNOW ❆", bot.user.displayAvatarURL);

        let snowlog = message.guild.channels.find(`name`, "snow");
        if(!snowlog) return;

        snowlog.send(tempmuteEmbed);

    }

}

module.exports.help = {
    name: "tempmute"
}
