const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  
    let prefixthing = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();
  
    if(cmd === `${prefixthing}deafen`) {

    let dUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
    if(!dUser) return message.channel.send("CAN'T FIND USER**!**");
    if(dUser.id === message.author.id) return message.channel.send("YOU CAN'T DEAFEN YOURSELF**!**");
    if(dUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("THIS USER CAN'T BE DEAFENED**!**");
    if(dUser.highestRole.position >= message.member.highestRole.position) return message.channel.send("YOU CAN NOT DEAFEN A MEMBER WHO HAS A HIGHER OR THE SAME ROLE AS YOU**!**");

    let muterole = message.guild.roles.find(`name`, "DEAFENED // ❆");
    if(!muterole) {

        try {

            muterole = await message.guild.createRole({
                name: "DEAFENED // ❆",
                color: "#65798d",
                permissions: []
            })
            
            message.guild.channels.forEach(async (channel, id) => {

                await channel.overwritePermissions(muterole, {
                    SPEAK: false

                });

            });

        } catch (e) {

            // console.log(e.stack);

        }

    }

    if(dUser.roles.has(muterole.id)) return message.channel.send("THIS USER IS ALREADY DEAFENED**!**");

    let mutetime = args[1];
    if(!mutetime) return message.channel.send("SPECIFY A TIME**!**");
    
    await(dUser.addRole(muterole.id));
    message.channel.send(`<@${dUser.id}> HAS BEEN **DEAFENED** FOR **${ms(ms(mutetime))}!**`);

    let muteEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setTitle("DEAFEN ❆")
    .setTimestamp()
    .addField("USER", dUser)
    .addField("MODERATOR", message.author)
    .addField("CHANNEL", message.channel)
    .addField("DURATION", ms(ms(mutetime)))
    .setFooter("SNOW ❆", bot.user.displayAvatarURL);

    let snowlog = message.guild.channels.find(`name`, "snow");
    if(!snowlog) return;

    snowlog.send(muteEmbed);

    let autounmuteEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setTitle("UNDEAFEN ❆")
    .setTimestamp()
    .addField("USER", dUser)
    .addField("MODERATOR", "<@417210018576990208>")
    .addField("DURATION", ms(ms(mutetime)))
    .setFooter("SNOW ❆", bot.user.displayAvatarURL)

    let snowlog1 = message.guild.channels.find(`name`, "snow");
    if(!snowlog) return;

    setTimeout(function() {
        // if(!mUser.roles.has(muterole)) return;
        dUser.removeRole(muterole.id);
        snowlog1.send(autounmuteEmbed);
    }, ms(mutetime));

}

}
module.exports.help = {
    name: "deafen"
}
