const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let avatar = message.mentions.users.first() || message.author;
    if(!avatar.avatarURL) return message.channel.send("CAN'T FIND THE AVATAR FOR THE DESIRED USER**!**");
    
    if(args[0] === "server") {
     
        let servericonEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("AVATAR **" + snow.snowflake + " // " + message.guild.name + `**\n[**[ DOWNLOAD ]**](${message.guild.iconURL + "?size=2048"})`)
        .setImage(message.guild.iconURL + "?size=2048")
        
        return message.channel.send(servericonEmbed);
        
    }

    let avatarEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription("AVATAR **" + snow.snowflake + " // " + avatar.username + `**\n[**[ DOWNLOAD ] **](${avatar.avatarURL})`)
    .setImage(avatar.avatarURL);

    message.channel.send(avatarEmbed);

}

module.exports.help = {
    name: "avatar"
}
