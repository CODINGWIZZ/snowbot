const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();
    
    if(cmd === `${prefix}feedback`) {
    
        let feedback = args.join(" ");
        if(!feedback) return message.channel.send("PLEASE ENTER A MESSAGE THAT YOU WANT TO SEND LIKE FEEDBACK**!**");
        
        let feedbackEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("FEEDBACK **❆**")
        .addField("FEEDBACK BY", message.author)
        .addField("FEEDBACK", feedback)
        .setFooter("FEEDBACK | SNOW ❆", bot.user.displayAvatarURL);
        
        bot.channels.get("483909335513301002").send(feedbackEmbed);
    
    }

}

module.exports.help = {
    name: "feedback"
}
