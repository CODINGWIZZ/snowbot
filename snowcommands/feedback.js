const Discord = require("discord.js");
const snow = require("../snow.json");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    let feedback = args.join(" ");
    if(!feedback) return message.channel.send("PLEASE ENTER A MESSAGE YOU WANT TO SEND LIKE A FEEDBACK FORM**!**");

    let feedbackEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription("FEEDBACK **" + snow.snowflake + "**")
    .addField("WRITTEN BY", message.author + " **// " + message.author.username + "**#" + message.author.discriminator)
    .addField("FEEDBACK", feedback)
    .setFooter("FEEDBACK | SNOW " + snow.snowflake, bot.user.displayAvatarURL);

    bot.channels.get("483909335513301002").send(feedbackEmbed);
    message.channel.send("THANKS **" + message.author.username + "** FOR THE FEEDBACK**!** WE'LL TRY TO MAKE YOUR WISH COME TRUE**!**");

}

module.exports.help = {
    name: "feedback"
}
