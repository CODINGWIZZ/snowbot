const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const snow = require("../../config/snow.json");

    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("YOU DON'T HAVE PERMISSIONS TO DO THAT**!**");
    
    if(!args[0]) return message.channel.send("PLEASE MENTION A USER YOU WANT TO MUTE**!**");

    let mUser = message.guild.member(bot.users.find(user => user.id === args[0]) || message.mentions.users.first() || message.guild.members.get(args[0]) || bot.users.find(user => user.username.toLowerCase() === args[0].toLowerCase()));
    if(!mUser) return message.channel.send("CAN'T FIND USER**!**");
    
    if(mUser.id === message.author.id) return message.channel.send("YOU CAN'T MUTE YOURSELF**!**");

    let snowbot = message.guild.member(bot.users.find(user => user.id === "417210018576990208"));

    if(mUser.highestRole.position >= snowbot.highestRole.position) return message.channel.send("SNOW MUST HAVE A HIGHER OR THE SAME ROLE AS THE MEMBER YOU WANT TO MUTE**!**");

    let muterole = message.guild.roles.find(role => role.name === "MUTED");
    if(!muterole) {

        try {

            muterole = await message.guild.createRole({
                name: "MUTED",
                color: "#5a6788",
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

    await(mUser.addRole(muterole.id));
    message.channel.send(`${mUser} HAS BEEN MUTED**!**`);

    let muteEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setTimestamp()
    .setDescription("MUTE **" + snow.snowflake + "**")
    .addField("USER", mUser)
    .addField("MODERATOR", message.author)
    .addField("CHANNEL", message.channel)
    .setFooter("SNOW " + snow.snowflake, bot.user.displayAvatarURL);

    let snowlog = message.guild.channels.find(channel => channel.name === "snow");
    if(!snowlog) return;

    snowlog.send(muteEmbed);
  
}

module.exports.config = {
    name: "mute",
    usage: "s!mute < USER >",
    permission: "MUTE_MEMBERS",
    aliases: "NONE"
}
