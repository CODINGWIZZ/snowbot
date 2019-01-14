const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {
    
    function checkBots(guild) {
     
        let botCount = 0;
        guild.members.forEach(member => {
         
            if(member.user.bot) botCount++;
            
        });
        
        return botCount;
        
    }
    
    function checkMembers(guild) {
     
        let memberCount = 0;
        guild.members.forEach(member => {
            
            if(!member.user.bot) memberCount++;
            
        });
        
        return memberCount;
        
    }

    let vertification = {

        0: "NONE",
        1: "LOW",
        2: "MEDIUM",
        3: "(╯°□°）╯︵ ┻━┻",
        4: "┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻"

    };

    let snowonline = "<:SNOWONLINE:461875150892171274>";
    let snowidle = "<:SNOWIDLE:461875150896496660>";
    let snowdnd = "<:SNOWDND:461875150716010497>";
    let snowoffline = "<:SNOWOFFLINE:461875151328378890>";

    let presences = message.guild.presences.map(st => st.status);

    let onlinemembers = 0;
    let idlemembers = 0;
    let dndmembers = 0;

    for(const i in presences) {

        if(presences[i] === "online") {

            onlinemembers += 1;

        }

    }

    for(const i in presences) {

        if(presences[i] === "idle") {

            idlemembers += 1;

        }

    }

    for(const i in presences) {

        if(presences[i] === "dnd") {

            dndmembers += 1;

        }

    }
    
    let textchannels = message.guild.channels.filter(tc => tc.type === "text").size;
    let voicechannels = message.guild.channels.filter(vc => vc.type === "voice").size;
    
    let channels = textchannels + voicechannels;

    let offlinemembers = message.guild.memberCount - onlinemembers - idlemembers - dndmembers;

    let serverinfoEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription(`**${message.guild.name}** **//** **(** ${message.guild.id} **)**`, "** **")
    .setThumbnail(message.guild.iconURL)
    .addField("OWNER", message.guild.owner + ` **//** **(** ${message.guild.owner.id} **)**`)
    .addField("VERTIFICATION LEVEL", vertification[message.guild.verificationLevel])
    .addField("CREATED", message.guild.createdAt.toDateString().toUpperCase(), true)
    .addField("REGION", message.guild.region.toUpperCase(), true)
    .addField("ROLES **(** " + message.guild.roles.size + " **)**", "TYPE `s!serverroles` TO SEE ALL ROLES ON THIS SERVER**!**", true)
    .addField("CHANNELS", channels + "\n\n TEXT CHANNELS: **" + textchannels + "**\n VOICE CHANNELS: **" + voicechannels + "**", true)
    .addField("TOTAL MEMBERS", message.guild.memberCount + "\n\n**" + checkMembers(message.guild) + "** HUMANS \n **" + checkBots(message.guild) + "** BOTS", true)
    .addField("ONLINE MEMBERS", onlinemembers + idlemembers + dndmembers, true)
    .addField("CURRENT MEMBER PRESENCES", snowonline + " **//** " + onlinemembers + "\n" + snowidle + " **//** " + idlemembers + "\n" + snowdnd + " **//** " + dndmembers + "\n" + snowoffline + " **//** " + offlinemembers)
    .setFooter("SERVER INFO | SNOW " + snow.snowflake, bot.user.displayAvatarURL);

    message.channel.send(serverinfoEmbed);

}

module.exports.help = {
    name: "serverinfo"
}
