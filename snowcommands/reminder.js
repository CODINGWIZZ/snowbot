const Discord = require("discord.js");
const snow = require("../snow.json");

const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}reminder`) {

        let remindertime = args[0];
        if(!remindertime) return message.channel.send("PLEASE SPECIFY A TIME AND THEN A NOTE FOR THE REMINDER**!**");

        let remindernote = args.slice(1).join(" ");
        if(!remindernote) return message.channel.send("PLEASE ENTER A REMINDER NOTE AS WELL**!**");

        message.channel.send(`A REMINDER HAS BEEN SET FOR **${ms(ms(remindertime))}!**`);

        setTimeout(function () {

            let reminderEmbed = new Discord.RichEmbed()
            .setColor(snow.blue)
            .setTimestamp()
            .setDescription(`THE **${ms(ms(remindertime))}** YOU MADE IN **${message.guild.name}** HAS BEEN FINISHED**!**`)
            .addField("REMINDER NOTE", remindernote)
            .setFooter("SNOW ❆", bot.user.displayAvatarURL);

            message.author.send(reminderEmbed);

        }, ms(remindertime));

    }

}

module.exports.help = {
    name: "reminder"
}
