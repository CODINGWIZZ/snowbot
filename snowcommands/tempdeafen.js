const Discord = require("discord.js");
const snow = require("../snow.json");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("DEAFEN_MEMBERS")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");

    if(!args[0]) return message.channel.send("PLEASE MENTION A USER YOU WANT TO TEMPDEAFEN**!**");

    let tdUser = message.guild.member(message.mentions.users.fist() || message.guild.members.get(args[0]));
    if(!tdUser) return message.channel.send("CAN'T FIND USER**!**");
    if(tdUser === message.guild.id) return message.channel.send("YOU CAN NOT TEMPDEAFEN YOURSELF**!**");
    if(tdUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("THIS USER CAN'T BE TEMPDEAFENED**!**");
    if(tdUser.highestRole.position >= message.member.highestRole.position) return message.channel.send("YOU CAN NOT TEMPDEAFEN A MEMBER WHO HAS A HIGHER OR THE SAME ROLE AS YOU**!**");

    let tempdeafenrole = message.guild.roles.find(`name`, "DEAFENED " + snow.snowflake);
    if(!tempdeafenrole) {

        try {

            tempdeafenrole = await message.guild.createRole({
                name: "DEAFENED " + snow.snowflake,
                color: "#5a6788",
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
    message.channel.send(`${tdUser} HAS BEEN TEMPDEAFEN**!**`);

    let tempdeafenEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setTimestamp()
    .setDescription("TEMPDEAFEN **" + snow.snowflake + "**")
    .addField("USER", tdUser)
    .addField("MODERATOR", message.author)
    .addField("CHANNEL", message.channel)
    .setFooter("SNOW " + snow.snowflake, bot.user.displayAvatarURL);

    snowlog.send(tempdeafenEmbed);

}

module.exports.help = {
    name: "tempdeafen"
}
