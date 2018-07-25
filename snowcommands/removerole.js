const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}removerole`) {

        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");

        if(!args[0]) return message.channel.send("PLEASE MENTION A USER THAT YOU WANT TO REMOVE A ROLE FROM**!**");

        let rrUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
        if(!rrUser) return message.channel.send("CAN'T FIND USER**!**");

        let role = args.slice(1).join(" ");
        if(!role) return message.channel.send("PLEASE SPECIFY A ROLE**!**");

        let rrRole = message.guild.roles.find(`name`, role);
        if(!rrRole) return message.channel.send("CAN'T FIND ROLE**!**");

        if(rrUser.highestRole.position >= message.member.highestRole.position) return message.channel.send("YOU CAN NOT ADD A ROLE TO A MEMBER WITH A HIGHER OR THE SAME ROLE AS YOU**!**");
        if(!rrUser.roles.has(rrRole.id)) return message.channel.send("THAT USER DOESN'T HAVE THAT ROLE**!**");

        await(arUser.removeRole(rrRole.id)).then(() => {

            message.channel.send(`<@${rrUser.id}> HAS BEEN REMOVED FROM THE ${rrRole} ROLE**!**`);

            let removeroleEmbed = new Discord.RichEmbed()
            .setColor(snow.blue)
            .setDescription("REMOVE ROLE **❆**")
            .setTimestamp()
            .addField("USER", rrUser)
            .addField("ROLE", rrRole)
            .addField("MODERATOR", message.author)
            .addField("CHANNEL", message.channel)
            .setFooter("SNOW ❆", bot.user.displayAvatarURL);

            let snowlog = message.guild.channels.find(`name`, "snow");
            if(!snowlog) return;

            snowlog.send(removeroleEmbed);

        });

    }

}

module.exports.help = {
    name: "removerole"
}
