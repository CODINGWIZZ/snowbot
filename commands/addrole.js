const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
 
   // COMMANDS | COMMAND HANDLER
   if(cmd === `${prefix}addrole`) {

   if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
   // if(!permissions.has("MANAGE_MEMBERS")) return message.channel.send("CANNOT DO THAT **-** MAKE SURE I HAVE THE RIGH PERMISSIONS**!**");
   let aMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args [0]);
   // if (rMember == "417210018576990208") return;
   if(!args[0]) return message.channel.send("PLEASE MENTION A USER THAT YOU WANT TO ADD A ROLE TO**!**");
   if(!aMember) return message.channel.send("CAN'T FIND USER**!**");
   let role = args.slice(1).join(" ");
   if(!role) return message.channel.send("SPECIFY A ROLE**!**");
   let gRole = message.guild.roles.find(`name`, role);
   if(!gRole) return message.channel.send("CAN'T FIND ROLE**!**");
   // if(rMember.highestRole.position >= message.member.highestRole.position) return message.channel.send("CAN NOT GIVE A ROLE THAT'S HIGHER UP THAN YOURSELF**!**");

   if(aMember.highestRole.position >= message.member.highestRole.position) return message.channel.send("YOU CAN NOT ADD A ROLE TO A MEMBER WITH THE SAME OR A HIGHER ROLE AS YOU**!**");    
   if(aMember.roles.has(gRole.id)) return message.channel.send("THAT USER ALREADY HAVE THAT ROLE**!**");  
        
   await(aMember.addRole(gRole.id)).then(() => {
   message.channel.send(`<@${aMember.id}> HAS BEEN ADDED TO THE **${gRole}** ROLE**!**`);

   let addroleEmbed = new Discord.RichEmbed()
   .setDescription("ADD ROLE **❆**")
   .setTimestamp()
   .setColor(botconfig.blue)
   .addField("USER", aMember)
   .addField("ROLE", gRole)
   .addField("MODERATOR", message.author)
   .addField("CHANNEL", message.channel)
   .setFooter("SNOW ❆", bot.user.displayAvatarURL);

   let addrolechannel = message.guild.channels.find(`name`, "snow");
   if(!addrolechannel) return; 

   return addrolechannel.send(addroleEmbed);

    });

  }

}

module.exports.help = {
  name: "addrole"
}
