const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
  if(cmd === `${prefix}mute`) {
  
  let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!message.member.hasPermission("MANAGE_MESSAGE")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
  if(!mUser) return message.channel.send("CAN'T FIND USER**!**");
  if(mUser.id === message.author.username) return message.channel.send("YOU CAN'T MUTE YOURSELF**!**");
  if(mUser.hasPermission("MANAGE_PERMISSIONS")) return message.channel.send("THIS USER CAN'T BE MUTED**!**");
  
  let muterole = message.guild.roles.find(`name`, `MUTED // ❆`);
  if(!muterole) {
  
    try {
      muterole = await message.guild.createRole({
          name: "MUTED // ❆",
          color: "#65798d",
          permissions: []
    })
    message.guild.channels.forEach(async (channel, id) => {
    
        await channel.overwritePermissios(muterole, {
             SEND_MESSAGES: false,
             ADD_REACTIOS: false,
             SPEAK: false
    
    });
    });
  
  } catch(e) {
    // console.log(e.stack);
  }
  
  }
  
  let mutetime = args[1];
  if(!mutetime) return message.channel.send("SPECIFY A TIME**!**");
  
  if(mUser.roles.has(muterole.id)) return message.channel.send("THIS USER IS ALREADY MUTED**!**");
  
  await(mUser.addrole(muterole));
  message.channel.send(`<${mUser.id}> HAS BEEN **MUTED** FOR **${ms(ms(mutetime))}**`);
  
  let muteEmbed = new Discord.RichEmbed()
  .setColor(botconfig.blue)
  .setTitle("MUTE ❆")
  .setTimestamp()
  .addField("USER", mUSer)
  .addField("MODERATOR", message.author)
  .addField("CHANNEL", message.channel)
  .addField("TIME", `${ms(ms(mutetime))}`)
  .setFooter("SNOW ❆", bot.user.displayAvatarURL);
  
  let snowlog = message.guild.channels.find(`name`, "snow-log");
  if(!snowlog) return;
  
  snowlog.send(muteEmbed);
  
  let automuteEmbed = new Discord.RichEmbed()
  .setColor(botconfig.blue)
  .setTitle("UNMUTE ❆")
  .setTimestamp()
  .addField("USER", mUser)
  .addField("MODERATOR", "<@417210018576990208>")
  .setFooter("SNOW ❆", bot.user.displayAvatarURL);
  
  let snowlog1 = message.guild.channels.find(`name`, "snow-log");
  if(!snowlog1) return;
  
  if(!mUser.roles.has(muterole.id)) return message.channel.send("THIS USER IS NOT MUTED**!**");
  
  setTimeout(function () {
  
    mUser.removerole(muterole);
    if(!mUser.roles.has(muterole.id)) return;
    snowlog1.send(automuteEmbed);
  
  }, ms(ms(mutetime)));

}

}

module.exports.help = {
  name: "mute"
}
