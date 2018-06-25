const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
     // TEMPDEAFEN COMMAND
    if(cmd === `${prefix}tempdeafen`) {
        if(!message.member.hasPermission("DEAFEN_MEMBERS")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!*");

        let dUser = message.guild.member(message.mentions.members.first()) || message.guild.members.get(args[0]);
        if(!args[0]) return message.channel.send("PLEASE MENTION A USER THAT YOU WANT TO TEMPDEAFEN**!**");
        if(!dUser) return message.channel.send("CAN'T FIND USER**!**");

        if(dUser.id === message.author.id) return message.channel.send("YOU CAN'T DEAFEN YOURSELF**!**");
        if(dUser.highestRole.position >= message.member.highestRole.position) return message.channel.send("YOU CAN NOT TEMPDEAFEN A MEMBER WHO HAS HIGER OR HAS SAME ROLE AS YOU**!**");

        let deafenrole = message.guild.roles.find(`name`, `DEAFENED // ❆`);
        if(!deafenrole) {
            try {
                role = await message.guild.createRole({
                    name: "DEAFENED // ❆",
                    color: "#65798d",
                    permissions: []
                });

                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(role, {
                        SPEAK: false
                    });
                });
            } catch(e) {
               // console.log(e.stack);
            }
        }

        if(dUser.roles.has(deafenrole.id)) return message.channel.send("THIS USER IS ALREADY MUTED**!**");

                
        await(dUser.addRole(deafenrole.id));
        message.channel.send(`${dUser} HAS BEEN **DEAFENED!**`);

        let tempdeafenembed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setTimestamp()
        .setTitle("TEMPDEAFEN ❆")
        .addField("USER", dUser)
        .addField("MODERATOR", message.channel)
        .addField("CHANNEL", message.channel)
        .setFooter("SNOW ❆", bot.user.displayAvatarURL);

        let snowlog = message.guild.channels.find(`name`, "snow");
        if(!snowlog) return;

        snowlog.send(tempdeafenembed);

        return;

    }
  
}

module.exports.help = {
  name: "tempdeafen"
} 
