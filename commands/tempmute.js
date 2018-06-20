const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
      // TEMPMUTE COMMAND
    if(cmd === `${prefix}tempmute`) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
            
        let toMute = message.guild.member(message.mentions.members.first()) || message.guild.members.get(args[0]);
        if(!toMute) return message.channel.send("CAN'T FIND USER**!**");

        if(toMute.id === message.author.id) return message.channel.send("YOU CAN'T MUTE YOURSELF**!**");
        if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("YOU CAN NOT MUTE A MEMBER WHO HAS A HIGHER OR THE SAME ROLE AS YOU**!**");

        let muterole = message.guild.roles.find(`name`, `MUTED // ❆`);    
        if(!muterole) {
            try {
                role = await message.guild.createRole({
                    name: "MUTED // ❆",
                    color: "#65798d",
                    permissions: []
                });

                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(role, {
                        SEND_MESSAGES: false,
                        SPEAK: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch(e) {
              //  console.log(e.stack);
            }
        }

        if(toMute.roles.has(muterole.id)) return message.channel.send("THIS USER IS ALREADY MUTED**!**");

        await(toMute.addRole(muterole.id));        
        message.channel.send(`${toMute} HAS BEEN **MUTED!**`);

        let tempmuteembed = new Discord.RichEmbed()
        .setTitle("TEMPMUTE ❆")
        .setTimestamp()
        .setColor(botconfig.blue)
        .addField("USER", toMute)
        .addField("MODERATOR", message.author)
        .addField("CHANNEL", message.channel)
        .addField("MUTECASE", mutecase)
        .setFooter("SNOW ❆", bot.user.displayAvatarURL);

        let snowlog = message.guild.channels.find(`name`, "snow");
        if(!snowlog) return;

        snowlog.send(tempmuteembed);
        return;
        
    }
  
}

module.exports.help = {
  name: "tempmute"
} 
