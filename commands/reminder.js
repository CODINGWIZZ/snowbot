   const Discord = require("discord.js");
   const ms = require("ms");
   const botconfig = require("../botconfig.json");
   
   module.exports.run = async (bot, message, args) => {
   
   // REMINDER COMMAND
    if(cmd === `${prefix}reminder`) {

    let remindertime = args[0];
    if(!remindertime) return message.channel.send("SPECIFY A TIME AND A NOTE**!**");

    let notemessage = args.join(" ");
    if(!args[1]) return message.channel.send("PLEASE ENTER A REMINDER NOTE AS WELL**!**");

    message.channel.send(`A REMINDER HAS BEEN SET FOR **${ms(ms(remindertime))}!**`);

    setTimeout(function() {

        let reminderEmbed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setDescription(`THE **${ms(ms(remindertime))}** HAS BEEN FINISHED IN **${message.guild.name}!**`)
        .addField("REMINDER NOTE", `${notemessage}`)
        .setFooter("SNOW ❆", bot.user.displayAvatarURL);

        message.author.send(reminderEmbed);

    }, ms(remindertime));

    }
    
    }
    
    module.exports.help {
      name: "reminder"
    }
