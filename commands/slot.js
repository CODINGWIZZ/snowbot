const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
      // SLOT COMMAND
    if(cmd === `${prefix}slot` || cmd === `${prefix}spin`) {

    let slotItems = ["🌳", "🌲", "🍀", "🍃", "🌿"];

    let slotRandom1 = Math.floor((Math.random()) * slotItems.length);
    let slotRandom3 = Math.floor((Math.random()) * slotItems.length);
    let slotRandom4 = Math.floor((Math.random()) * slotItems.length);
    let slotRandom5 = Math.floor((Math.random()) * slotItems.length);
    let slotRandom6 = Math.floor((Math.random()) * slotItems.length);
    let slotRandom7 = Math.floor((Math.random()) * slotItems.length);
    let slotRandom8 = Math.floor((Math.random()) * slotItems.length);
    let slotRandom9 = Math.floor((Math.random()) * slotItems.length);

    message.channel.send("**" + message.author.username + "**")
        
    let slotEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setDescription(slotItems[slotRandom1] + " **|** " + slotItems[slotRandom2] + " **|** " + slotItems[slotRandom3] + "\n" + slotItems[slotRandom4] + " **|** " + slotItems[slotRandom5] + " **|** " + slotItems[slotRandom6] + "\n" + slotItems[slotRandom7] + " **|** " + slotItems[slotRandom8] + " **|** " + slotItems[slotRandom9])
    .setFooter("SLOT | SNOW ❆", bot.user.displayAvatarURL);

    return message.channel.send(slotEmbed);

  }
   
}

module.exports.help = {
  name: "slot"
} 
