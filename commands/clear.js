const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();
    
    if(cmd === `${prefix}clear`) {

    message.delete();//.catch(O_o=>{});

    const amount = isNaN(args[0]) ? parseInt(args[1]) : parseInt(args[0]);

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
    // if(!permissions.has("MANAGE_MESSAGES")) return message.channel.send("CANNOT DO THAT **-** MAKE SURE I HAVE THE RIGHT PERMISSIONS**!**");
    if (amount < 0) return message.channel.send("CANNOT DELETE A NEGATIVE NUMBER OF MESSAGES**!**")
    if (amount > 100) return message.channel.send("CAN ONLY DELETE 99 MESSAGES MAX**!**")

    if(!args[0]) return message.channel.send("PLEASE ENTER A CERTAIN NUMBER YOU WANT TO DELETE**!**");
    await message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send("CLEARED `" + args[0] + "` MESSAGES**!**").then(msg => msg.delete(5000));
    });

    } catch (err) => {
        
        console.log(err);
        
    }
    
}

module.exports.help = {
  name: "clear"
}
