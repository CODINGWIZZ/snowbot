const Discord = require("discord.js");
const snow = require("../snow.json");

const fortnite = require("fortnite");
const ft = new fortnite("5e9103e1-e035-4fe5-b4e6-35ae1c386402");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}fortnite`) {

        let platform = args[0];
        let username = args.slice(1).join(" ");
        
        let platforms = ["PC", "PSN", "XBL"];
        
        if(!platform) return message.channel.send("PLEASE ENTER A PLATFORM AND THEN THE USERNAME**!**");
        if(!username) return message.channel.send("PLEASE ENTER A USERNAME TO CHECK FORTNITE STATS**!**");

        message.channel.send("YOUR FORTNITE STATS IS BEING REQUESTED **...**").then((fortniteMessage) => {

            let data = ft.getPlatform(platform, username).then(data => {

                let stats = data.lifetimeStats;
                let kills = stats.find(s => s.stat == "kills");
                let wins = stats.find(s => s.stat == "wins");
                let kd = stats.find(s => s.stat == "kd");
                let mPlayed = stats.find(s => s.stat == "matchesPlayed");

                let fortniteEmbed = new Discord.RichEmbed()
                .setColor(snow.blue)
                .setDescription("FORTNITE STATS **❆**")
                .addField(`**${data.username}**`, "**//**")
                .addField("KILLS", kills.value)
                .addField("WINS", wins.value)
                .addField("K/D", kd.value)
                .addField("MATCHES PLAYED", mPlayed.value)
                .setFooter("FORTNITE STATS | SNOW ❆", bot.user.displayAvatarURL);

                fortniteMessage.edit(fortniteEmbed);

            }).catch(e => {

                return message.channel.send("COULDN'T FIND THAT FORTNITE USERNAME**!**");
            
            });

        });

    }

}

module.exports.help = {
    name: "fortnite"
}
