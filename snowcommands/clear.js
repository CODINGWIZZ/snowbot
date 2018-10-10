const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    message.delete().catch(O_o=>{});
    
    const amount = isNaN(args[0]) ? parseInt(args[1]) : parseInt(args[0]);
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
    if(amount < 0) return message.channel.send("CANNOT DELETE A NEGATIVE NUMBER OF MESSAGES**!**");
    if(amount > 99) return message.channel.send("CAN ONLY DELETE **99** MESSAGES MAX**!**");
    if(amount === 0) {
    
        message.channel.bulkDelete("99").then(() => {
            message.channel.send(`CLEARED **${args[0]}** MESSAGES**!**`).then(deleteMessage2 => deleteMessage2.delete(5000));   
        });
        
        return;
        
    }
    
    if(!args[0]) return message.channel.send("PLEASE ENTER A CERTAN NUMBER YOU WANT TO DELETE**!**");
    
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`CLEARED **${args[0]}** MESSAGES**!**`).then(deleteMessage => deleteMessage.delete(5000));
    });
    
    return;

}

module.exports.help = {
    name: "clear"
}
