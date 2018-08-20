const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();
    
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
    
    if(cmd === `${prefix}membercount`) {
    
        let membercountEmbed = new Disord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("MEMBERCOUNT **❆ //**" + message.guild.name)
        .addField("TOTAL MEMBERS", message.guild.memberCount)
        .addField("ONLINE", onlinemembers + idlemembers + dndmembers);
        
        message.channel.send(membercountEmbed);
    
    }

}

module.exports.help = {
    name: "membercount"
}
