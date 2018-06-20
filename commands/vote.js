const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
      // VOTE COMMMAND
    if(cmd === `${prefix}vote`) {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
    const thumbup = "👍";
    const perhaps = "🤷";
    const thumbdown = "👎";

    const voteMessage = args.join(" ");
    if(!voteMessage) return message.channel.send("PLEASE INDICATE A VOTE MESSAGE AS WELL**!**");

    let voteEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setAuthor("VOTE!")
    .setTitle("**/**")
    .setDescription(`${voteMessage}`)
    .setFooter("VOTE | SNOW ❆", bot.user.displayAvatarURL);

    let msg = await message.channel.send(voteEmbed);
    await msg.react(thumbup);
    await msg.react(thumbdown);
    await msg.react(perhaps);
     //await msg.react(client.emojis.find(`name`, "SNOWPERHAPS"));
    //await msg.react(client.emojis.find(`name`, "SNOWCROSS"));
    }

}

module.exports.help = {
  name: "vote"
}
