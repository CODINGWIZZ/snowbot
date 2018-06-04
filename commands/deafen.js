const Discord = require("discord.js");
const ms = require("ms");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

 if(cmd === `${prefix}deafen`) {
 
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

        let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
        if (!toMute) return message.channel.send("CAN'T FIND USER**!**");
        if(toMute.id === message.author.id) return message.channel.send("YOU CAN'T DEAFEN YOURSELF**!**");
        if(toMute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("THIS USER CAN'T BE DEAFENED**!**");
        let deafenrole = message.guild.roles.find(`name`, `DEAFENED / ❆`);
        if(!deafenrole){
            try{
                deafenrole = await message.guild.createRole({
                    name: "DEAFENED / ❆",
                    color: "#65798d",
                    permissions: []
                })
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(deafenrole, {
                        SPEAK: false
                    });
                });
            }catch(e){
                console.log(e.stack);
            }
        } 

        let mutetime = args[1];
        if(!mutetime) return message.channel.send("SPECIFY A TIME**!**");

        if(toMute.roles.has(deafenrole.id)) return message.channel.send("THIS USER IS ALREADY DEAFENED**!**");

        await(toMute.addRole(deafenrole));
        message.channel.send(`<@${toMute.id}> HAS BEEN **DEAFENED** FOR **${ms(ms(mutetime))}!**`);

        if(toMute.deafenrole.has(role.id)) return message.channel.send("THIS USER IS ALREADY DEAFENED**!**");

        let deafenembed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setTitle("DEAFEN ❆")
        .setTimestamp()
        .addField("USER", toMute)
        .addField("MODERATOR", message.author)
        .addField("CHANNEL", message.channel)
        .addField("TIME", `${ms(ms(mutetime))}`)
        .setFooter("SNOW ❆", "https://cdn.discordapp.com/avatars/417210018576990208/28a49ed4c98902f605d633bf261d9050.png?size=2048");

        let snowlog = message.guild.channels.find(`name`, "snow-log");
        if(!snowlog) return;
  
        snowlog.send(deafenembed);

        let autoundeafenEmbed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setTitle("UNDEAFEN ❆")
        .setTimestamp()
        .addField("USER", toMute)
        .addField("MODERATOR", "AUTO")
        .setFooter("SNOW ❆", "https://cdn.discordapp.com/avatars/417210018576990208/28a49ed4c98902f605d633bf261d9050.png?size=2048");

        let snowlog1 = message.guild.channels.find(`name`, "snow-log");
        if(!snowlog1) return;

        if(!toMute.roles.has(deafenrole)) return message.channel.send("THIS USER IS NOT MUTED**!**");

        setTimeout(function() {
            toMute.removeRole(deafenrole.id);
            if(!toMute.roles.has(muterole.id)) return;
            message.channel.send(`<@${toMute.id}> HAS BEEN **UNDEAFENED!**`)
            snowlog1.send(autoundeafenEmbed);
        }, ms(mutetime));
        
    }
    
}

module.exports.help = {
 name: "deafen"
}
