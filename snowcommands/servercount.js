// const Discord = require("discord.js");
// const snow = require("../snow.json");

// module.exports.run = async (bot, message, args) => {
    
//     function checkBots(guild) {
        
//         let botCount = 0;
//         guild.members.forEach(member => {
            
//             if(member.user.bot) botCount ++;
            
//         });
        
//         return botCount;
        
//     }
    
//     function checkMembers(guild) {
     
//         let memberCount = 0;
//         guild.members.forEach(member => {
            
//             if(!member.user.bot) memberCount ++;
            
//         });
        
//         return memberCount;
        
//     }

//     let presences = message.guild.presences.map(st => st.status);

//     let onlinemembers = 0;
//     let idlemembers = 0;
//     let dndmembers = 0;

//     for(const i in presences) {

//         if(presences[i] === "online") {

//             onlinemembers += 1;

//         }

//     }

//     for(const i in presences) {

//         if(presences[i] === "idle") {

//             idlemembers += 1;

//         }

//     }

//     for(const i in presences) {

//         if(presences[i] === "dnd") {

//             dndmembers += 1;

//         }

//     }

//     let inviteEmbed = new Discord.RichEmbed()
//     .setColor(snow.blue)
//     .setDescription("SERVERCOUNT **" + snow.snowflake + "**")
//     .addField("MEMBERS", message.guild.memberCount, true)
//     .addField("ONLINE", onlinemembers + idlemembers + dndmembers, true)
//     .addField("HUMANS // BOTS", checkMembers(message.guild) + " **//** " + checkBots(message.guild))
//     .setFooter("SERVERCOUNT | SNOW " + snow.snowflake, bot.user.displayAvatarURL);
    
//     message.channel.send(inviteEmbed);

// }

// module.exports.help = {
//     name: "servercount"
// }
