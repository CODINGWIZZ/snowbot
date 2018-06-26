const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
  // ROLE INFO
  if(cmd === `${prefix}roleinfo`) {
        
  let truefalse = {
          
    true: "TRUE",
    false: "FALSE"
            
   };
       
   let role = args.join(" ");
   if(!role) return message.channel.send("SPECIFY A ROLE**!**");
   let infoRole = message.guild.roles.find(`name`, role);
   if(!infoRole) return message.channel.send("CAN'T FIND ROLE**!**");

   let inforoleEmbed = new Discord.RichEmbed()
   .setDescription("ROLE INFO **❆**")
   .addField("** **", `**${infoRole.name}**`)
   .addField("ID", infoRole.id)
   .addField("COLOR", "HEX**:**\n" + "**#**" + infoRole.hexColor.slice(1) + "\n\n")
   .setColor(botconfig.blue)
   .addField("CREATED", infoRole.createdAt.toDateString())
   .addField("HOISTED", truefalse[infoRole.hoist])
   .addField("MANAGED", truefalse[infoRole.managed])
   .addField("MENTIONABLE", truefalse[infoRole.mentionable])
   .setFooter("ROLE INFO | SNOW ❆", bot.user.displayAvatarURL);

    message.channel.send(inforoleEmbed);

    }
  
}

module.exports.help = {
  name: "roleinfo"
}
