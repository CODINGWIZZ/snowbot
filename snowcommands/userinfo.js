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
        
        let roles = member.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => role);  
        if(roles.length < 1) roles = ["NONE"];
         
        let thenickname = member.nickname !== null ? member.nickname : "NONE";
        
//         let doing = "";
        
//         if(user.presence.game.type === 2) {
         
//             doing = "LISTENING TO";
            
//         } else if(user.presence.game.type === 3) {
            
//             doing = "WATCHING";
        
//         } else if(user.presence.game.type === 4) {
         
//             doing = "STREAMING";
            
//         } else {
         
//             doing = "PLAYING";
            
//         }
 
        let userinfoEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("USERINFO **❆** **// " + user.username + "**\n" + `${user.presence.game ? `Playing **${user.presence.game.name}**` : `NOT PLAYING ANYTHING RIGHT NOW**!**`}`)
        .addField("FULL USER", `**${user.username}**#${user.discriminator} **// (** ${user.id} **)**`)
        .addField("NICKNAME", thenickname)
        .addField("ROLES **(** " + `${member.roles.size - 1}` + " **)**", roles.join(" "))
        .addField("HIGHEST ROLE", member.highestRole)
        .addField("STATUS", `${status[user.presence.status]}`)
        .addField("ACCOUNT CREATED", user.createdAt.toDateString().toUpperCase())
        .setFooter("USERINFO | SNOW ❆", bot.user.displayAvatarURL);

        message.channel.send(userinfoEmbed);

    }

}

module.exports.help = {
    name: "userinfo"
}
