const Discord = require("discord.js");
const snow = require("../snow.js");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}vote`) {

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");

        const thumbsup = "👍";
        const perhaps = "🤷";
        const thumbsdown = "👎";

        let vote = args.join(" ");
        if(!vote) return message.channel.send("PLEASE ENTER A VOTE MESSAGE**!**");

        let voteEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("VOTE **❆**\n" + "**//**\n" + vote)
        .setFooter("VOTE | SNOW ❆", bot.user.displayAvatarURL);

        let voteMessage = await message.channel.send(voteEmbed);
        await voteMessage.react(thumbsup);
        await voteMessage.react(thumbsdown);
        await voteMessage.react(perhaps);

    }

}

module.exports.help = {
    name: "vote"
}
