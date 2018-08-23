const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {
    
    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}avatar`) {

        let avatar = message.mentions.users.first() || message.author;
        if(!avatar.avatarURL) return message.channel.send("CAN'T FIND THE AVATAR FOR THE DESIRED USER**!**");

        let avatarEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("AVATAR **❆ // " + avatar.username + `**\n[[**DOWNLOAD**]](${avatar.avatarURL})`)
        .setImage(avatar.avatarURL);
        
        message.channel.send(avatarEmbed);

    }

}

module.exports.help = {
    name: "avatar"
}
