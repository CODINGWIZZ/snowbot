const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();

   // REMOVE ROLE COMMAND
    if(cmd === `${prefix}removerole`) {

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
    // if(!permissions.has("MANAGE_MEMBERS")) return message.channel.send("CANNOT DO THAT **-** MAKE SURE I HAVE THE RIGH PERMISSIONS**!**");
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args [0]);
    // if (rMember === "417210018576990208") return;
    if(!args[0]) return message.channel.send("PLEASE MENTION A USER THAT YOU WANT TO REMOVE A ROLE FROM**!**");
    if(!rMember) return message.channel.send("CAN'T FIND USER**!**");
    let role = args.slice(1).join(" ");
    if(!role) return message.channel.send("SPECIFY A ROLE**!**");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) message.channel.send("CAN'T FIND ROLE**!**");
    //if(bot.user.highestRole.position >= rMember.highestRole.position) return message.channel.send("CAN NOT GIVE A ROLE THAT'S HIGHER UP THAN YOURSELF**!**");

    if(rMember.highestRole.position >= message.member.highestRole.position) return message.channel.send("YOU CAN NOT REMOVE A ROLE FROM A MEMBER WITH THE SAME OR A HIGHER ROLE AS YOU**!**");        
    if(!rMember.roles.has(gRole.id)) return message.channel.send("THAT USER DOESN'T HAVE THAT ROLE**!**");
    await(rMember.removeRole(gRole.id)).then(() => {
        message.channel.send(`<@${rMember.id}> HAS BEEN REMOVED FROM THE **${gRole}** ROLE**!**`);

        let removeroleEmbed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setTitle("REMOVE ROLE ❆")
        .setTimestamp()
        .addField("USER", rMember)
        .addField("ROLE", gRole)
        .addField("MODERATOR", message.author)
        .addField("CHANNEL", message.channel)
        .setFooter("SNOW ❆", bot.user.displayAvatarURL);

        let removerolechannel = message.guild.channels.find(`name`, "snow");
        if(!removerolechannel) return;

        removerolechannel.send(removeroleEmbed);
        
    });

    }
  
}

module.exports.help = {
  name: "removerole"
}
