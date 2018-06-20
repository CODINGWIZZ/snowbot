const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const fortnite = require("fortnite");
const ft = new fortnite("5e9103e1-e035-4fe5-b4e6-35ae1c386402");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
  // FORTNITE COMMAND
    if(cmd === `${prefix}fortnite`) {

    //let username = args [0];
    let username = args[0];
    let platform = args.slice(1).join(" ").toUpperCase();
        
    let platforms = ["PC", "PSN", "XBL"];

    if(!args[0]) return message.channel.send("PLEASE ENTER A FORTNITE USERNAME AND A PLATFORM TO CHECK FORTNITE STATS**!**");
    if(!platform) return message.channel.send("PLEASE ENTER A PLATFORM RIGHT AFTER THE PLATFORM**!**\n**(** `PC / PSN / XBL` **)**");
        
    if(!platforms.includes(platform)) return message.channel.send("PLEASE ENTER A VALID FORTNITE PLATFORM**!**\n**(** `PC / PSN / XBL` **)**");

    message.channel.send("YOUR FORTNITE STAT IS BEING REQUESTED **...**").then((msg) => {

    let data = ft.getInfo(username, platform).then(data => {

        let stats = data.lifetimeStats;
        let kills = stats.find(s => s.stat == 'kills');
        let wins = stats.find(s => s.stat == 'wins');
        let kd = stats.find(s => s.stat == 'kd');
        let mPlayed = stats.find(s => s.stat == 'matchesPlayed');

        let fUser = args.join(" ").slice(2);
        if(!fUser) return message.edit("CAN'T FIND FORTITE USERNAME**!**");

        let fortniteEmbed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setTitle("FORTNITE STATS ❆")
        .addField("**" + data.username + "**", "**/**")
        .addField("KILLS", kills.value)
        .addField("WINS", wins.value)
        .addField("K/D", kd.value)
        .addField("MATCHES PLAYED", mPlayed.value)
        .setFooter("FORTNITE STATS | SNOW ❆", bot.user.displayAvatarURL);

        msg.edit(fortniteEmbed).then(msgg => msgg.delete(40000));

    }).catch(e => {
        
        return msg.edit("COULDN'T FIND THAT USERNAME**!**").then(msggg => msggg.delete(10000));
        
    });
        
    });
        
    }

}

module.exports.help = {
  name: "fortnite"
}
