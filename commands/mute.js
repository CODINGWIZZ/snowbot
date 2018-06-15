const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}mute`) {
    let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
    if(!mUser) return message.channel.send("CAN'T FIND USER**!**");
    if(mUser.id === message.author.id) return message.channel.send("YOU CAN'T MUTE YOURSELF**!**");
    if(mUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("THIS USER CAN'T BE MUTED**!**");
    if(mUser.highestRole.position >= message.member.highestRole.position) return message.channel.send("YOU CAN NOT DEAFEN A MEMBER WHO HAS A HIGHER OR THE SAME ROLE AS YOU**!**");

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

            // console.log(e.stack);

        }

    }

    if(mUser.roles.has(muterole.id)) return message.channel.send("THIS USER IS ALREADY MUTED**!**");

    let mutetime = args[1];
    if(!mutetime) return message.channel.send("SPECIFY A TIME**!**");
        
    await(mUser.addRole(muterole.id));
    message.channel.send(`<@${mUser.id}> HAS BEEN **MUTED** FOR **${ms(ms(mutetime))}!**`);

    let muteEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setTitle("MUTE ❆")
    .setTimestamp()
    .addField("USER", mUser)
    .addField("MODERATOR", message.author)
    .addField("CHANNEL", message.channel)
    .addField("DURATION", ms(ms(mutetime)))
    .setFooter("SNOW ❆", bot.user.displayAvatarURL);

    let snowlog = message.guild.channels.find(`name`, "snow");
    if(!snowlog) return;

    snowlog.send(muteEmbed);

    let autounmuteEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setTitle("UNMUTE ❆")
    .setTimestamp()
    .addField("USER", mUser)
    .addField("MODERATOR", "<@417210018576990208>")
    .addField("DURATION", ms(ms(mutetime)))
    .setFooter("SNOW ❆", bot.user.displayAvatarURL)

    let snowlog1 = message.guild.channels.find(`name`, "snow");
    if(!snowlog) return;

    setTimeout(function() {
        if(!mUser.roles.has(muterole.id)) return;
        mUser.removeRole(muterole.id);
        snowlog1.send(autounmuteEmbed);
    }, ms(mutetime));

}

}

module.exports.help = {
    name: "mute"
}
