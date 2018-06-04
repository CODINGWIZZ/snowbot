const Discord = require("discord.js");
const ms = require("ms");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
   if(cmd === `${prefix}mute`) {

        let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
        if (!toMute) return message.channel.send("CAN'T FIND USER**!**");
        if(toMute.id === message.author.id) return message.channel.send("YOU CAN'T MUTE YOURSELF**!**");
        if(toMute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("THIS USER CAN'T BE MUTED**!**");
        let muterole = message.guild.roles.find(`name`, `MUTED / ❆`);
        if(!muterole){
            try{
                muterole = await message.guild.createRole({
                    name: "MUTED / ❆",
                    color: "#65798d",
                    permissions: []
                })
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_RECTIONS: false,
                        SPEAK: false
                    });
                });
            }catch(e){
                console.log(e.stack);
            }
        } 

        let mutetime = args[1];
        if(!mutetime) return message.channel.send("SPECIFY A TIME**!**");

        if(toMute.roles.has(muterole.id)) return message.channel.send("THIS USER IS ALREADY MUTED**!**");

        await(toMute.addRole(muterole));
        message.channel.send(`<@${toMute.id}> HAS BEEN **MUTED** FOR **${ms(ms(mutetime))}!**`);

        let muteembed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setTitle("MUTE ❆")
        .setTimestamp()
        .addField("USER", toMute)
        .addField("MODERATOR", message.author)
        .addField("CHANNEL", message.channel)
        .addField("TIME", `${ms(ms(mutetime))}`)
        .setFooter("SNOW ❆", bot.user.displayAvatarURL);

        let mutechannel = message.guild.channels.find(`name`, "snow-log");
        if(!mutechannel) message.guild.createChannel("snow-log"); 

        mutechannel.send(muteembed);

        let automuteembed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setTitle("UNMUTE ❆")
        .setTimestamp()
        .addField("USER", toMute)
        .addField("MODERATOR", "AUTO")
        .setFooter("SNOW ❆", bot.user.displayAvatarURL)

        let snowlog1 = message.guild.channels.find(`name`, "snow-log");
        if(!snowlog1) return;

        if(!toMute.roles.has(muterole.id)) return message.channel.send("THIS USER IS NOT MUTED**!**");
        
        setTimeout(function() {
            toMute.removeRole(muterole);
            if(!toMute.roles.has(muterole.id)) return;
            message.channel.send(`<@${toMute.id}> HAS BEEN **UNMUTED!**`)
            snowlog1.send(automutechannel);
        }, ms(mutetime));
        
    }
    
            if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");

        let toMute = message.guild.member(message.mentions.members.first()) || message.guild.members.get(args[0]);
        if(!toMute) return message.channel.send("CAN'T FIND USER**!**");

        let muterole = message.guild.roles.find(`name`, `MUTED / ❆`);

        if(!toMute.roles.has(muterole.id)) return message.channel.send("THIS USER IS NOT MUTED**!**");

        await(toMute.removeRole(muterole.id));
        message.channel.send(`${toMute} HAS BEEN **UNMUTED!**`);

        let unmuteembed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setTimestamp()
        .setTitle("UNMUTE ❆")
        .addField("USER", toMute)
        .addField("MODERATOR", message.author)
        .addField("CHANNEL", message.channel)
        .setFooter("SNOW ❆", bot.user.displayAvatarURL);

        let snowlog = message.guild.channels.find(`name`, "snow-log");
        if(!snowlog) return;

        snowlog.send(unmuteembed);

        return;
    
}
 

}

module.exports.help {
  name: "mute"
}
