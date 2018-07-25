const Discord = require("discord.js");
const snow = require("../snow.js");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}clear`) {

        const amount = isNaN(args[0]) ? parseFloat(args[1]) : parseInt(args[0]);

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");

        message.delete();

        if(!args[0]) return message.channel.send("PLEASE ENTER A CERTAIN NUMBER THAT YOU WANT TO DELETE**!**");

        if(amount < 0) return message.channel.send("CAN NOT DELETE A NEGATIVE NUMBER OF MESSAGES**!**");
        if(amount < 99) return message.channel.send("I CAN ONLY DELETE **99** MESSAGES MAX**!**");
        if(amount === "0") return message.channel.send("I'M SORRY, BUT I DON'T THINK YOU NEED ME IF YOU ARE GOING TO DELETE **0** MESSAGES**!**");

        await message.channel.bulkDelete(args[0]).then(() => {

            message.channel.send(`CLEARED \`${args[0]}\` MESSAGES**!**`).then(clearMessage => clearMessage.delete(5000));

        });

    }

}

module.exports.help = {
    name: "clear"
}
