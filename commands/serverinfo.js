const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
  // SERVER INFO
  if(cmd === `${prefix}serverinfo`) {

  const vertification = {
            0: "NONE",
            1: "LOW",
            2: "MEDIUM",
            3: "(╯°□°）╯︵ ┻━┻",
            4: "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻"
  };

  let serverinfoEmbed = new Discord.RichEmbed()
  .setDescription("SERVER INFO ❆")
  .setColor(botconfig.blue)
  .addField("** **", `**${message.guild.name}** **(** ${message.guild.id} **)**`)
  .setThumbnail(message.guild.iconURL)
  .addField("OWNER", message.guild.owner + " **(** " + message.guild.owner.id + " **)**")
  .addField("CREATED", message.guild.createdAt.toDateString())
  .addField("VERIFICATION LEVEL", vertification[message.guild.verificationLevel])
  .addField("REGION", message.guild.region, true)
  .addField("CHANNELS", message.guild.channels.size, true)
  .addField("MEMBERS", message.guild.memberCount, true)
  .addField("TOTAL ROLES", message.guild.roles.size, true)
  .setFooter("SERVER INFO | SNOW ❆", bot.user.displayAvatarURL);

  message.channel.send(serverinfoEmbed);
   
    }

}

module.exports.help = {
  name: "serverinfo"
}
