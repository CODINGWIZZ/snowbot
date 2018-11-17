const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}userinfo`) {

        let snowonline = "<:SNOWONLINE:461875150892171274>";
        let snowidle = "<:SNOWIDLE:461875150896496660>";
        let snowdnd = "<:SNOWDND:461875150716010497>";
        let snowoffline = "<:SNOWOFFLINE:461875151328378890>";

        let status = {

            online: `${snowonline} **//** ONLINE`,
            idle: `${snowidle} **//** IDLE`,
            dnd: `${snowdnd} **//** DND`,
            offline: `${snowoffline} **//** OFFLINE`

        };
        
        let user = message.mentions.users.first() || message.guild.members.get(args[0]) || message.author;
        let member = message.guild.member(user);
        
        let theroles = [];
        if(member.roles.size > 0) {
         
            member.roles.forEach(r => {
                
                if(!r.name.includes("everyone")) {
                 
                    theroles.push(r.name);
                    
                }
                    
                })
            
        } else {
         
            theroles = "no";
            
        }
        
        let roles = member.theroles.size > 0 ? theroles.length : "0";
        let currentroles = theroles.length > 0 ? theroles.join(", ") : "NO ROLES";
        
        let nickname = user.nickname !== null ? user.nickname : "NONE";
 
        let userinfoEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("USER INFO **❆** **// " + user.username + "**\n" + `${user.presence.game ? `Playing **${user.presence.game.name}**` : "NOT PLAYING ANYTHING**!**"}`)
        .addField("FULL NAME", `**${user.username}**#${user.discriminator}`)
        .addField("ID", user.id)
        .addField("ROLES [" + roles + "]", currentroles)
        .addField("NICKNAME", nickname)
        .addField("STATUS", `${status[user.presence.status]}`)
        .addField("ACCOUNT CREATED", user.createdAt.toDateString().toUpperCase())
        .setFooter("USER INFO | SNOW ❆", bot.user.displayAvatarURL);

        message.channel.send(userinfoEmbed);

    }

}

module.exports.help = {
    name: "userinfo"
}
