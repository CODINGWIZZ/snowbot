const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
  if(cmd === `${prefix}deafen`) {
  
  let dUser = message.guild.member(message.mentions.users.fist() || message.guild.members.get(args[0]));
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
  if(!dUser) return message.channel.send("CAN'T FIND USER**!**");
  if(dUser.id === message.author.id) return message.channel.send("YOU CAN'T DEAFEN YOURSELF**!**");
  if(dUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("THIS USER CAN'T DEAFENED**!**");
  if(dUser.highestRole.position >= message.member.higestRole.position) return message.channel.send("YOU CAN NOT DEAFEN A MEMBER WHO IS IN A HIGHER OR THE SAME ROLE AS YOU**!**");
  
  let deafenrole = message.guild.roles.find(`name`, "DEAFENED // ❆");
  if(!deafenrole) {
  
    try {
    
      deafenrole = await message.guild.createRole({
          name: "DEAFENED // ❆",
          color: "#65798d",
          permissions: []
          
    })
     
    message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(deafenrole, {
            SPEAK: false
        });
    });
  
  } catch (e) {
      console.log(e.stack);
  }
  
  }
  
  let deafentime = args[1];
  if(!deafentime) return message.channel.send("SPECIFY A TIME**!**");
  
  if(dUser.roles.has(deafenrole.id)) return message.channel.send("THIS USER IS ALREADY MUTED**!**");
  
  await(dUser.addRole(deafenrole));
  message.channel.send(`<@${dUser.id}> HAS BEEN **DEAFENED** FOR **${ms(ms(deafentime))}!**`);
  
  let deafenEmbed = new Discord.RichEmbed()
  .setColor(botconfig.blue)
  .setTimestamp()
  .setTitle("DEAFEN ❆")
  .addField("USER", dUser)
  .addField("MODERATOR", message.author)
  .addField("CHANNEL", message.channel)
  .addField("TIME", `${ms(ms(deafentime))}`)
  .setFooter("SNOW ❆", bot.user.displayAvatarURL);
  
  let snowlog = message.guild.channels.find(`name`, "snow-log");
  if(!snowlog) return;
  
  snowlog.send(deafenEmbed);
  
  let autodeafenEmbed = new Discord.RichEmbed()
  .setColor(botconfig.blue)
  .setTitle("UNDEAFEN ❆")
  .setTimestamp()
  .addField("USER", dUser)
  .addField("MODERATOR", "<@417210018576990208>")
  .setFooter("SNOW ❆", bot.user.displayAvatarURK);
  
  let snowlog1 = message.guild.channels.find(`name`, "snow-log");
  if(!snowlog1) return;
  
  if(!dUser.roles.has(deafenrole)) return message.channel.send("THIS USER IS NOT MUTED**!**");
  
  setTimeout(function() {
  
  if(!dUser.roles.has(deafenrole)) return;
  dUser.removeRole(deafenrole.id);
  snowlog1.send(autodeafenEmbed);
  
  }, ms(ms(deafentime)));

}
  
}

module.exports.help = {
  name: "deafen"
}
