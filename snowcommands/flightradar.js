const Discord = require("discord.js");
const snow = require("../snow.json");

const flight = require("flightradar24-client/lib/flight");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}flightradar`) {

        let callsign = args[0];
        if(!callsign) return message.channel.send("PLEASE ENTER A CALLSIGN THAT YOU WANT TO CHECK INFORMATION ABOUT**!**");

        flight(callsign);

        let flightradarEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription(`INFORMATION ABOUT ${callsign.toUpperCase()}`)
        .addField("MODEL", flight.model)
        .addField("REGISTRATION", flight.registration)
        .addField("AIRLINE", flight.airline)
        .addField("FLIGHT", flight.orgin.name + " (" + flight.orgin.id + ") - " + flight.orgin.country + " ✈ " + flight.destination.name + " ("+ flight.destination.id + ") - " +flight.destination.country)
        .setFooter("FLIGHTRADAR | SNOW ❆", bot.user.displayAvatarURL);

        message.channel.send(flightradarEmbed);

        if(err) console.log(err);

    } 

}

module.exports.help = {
    name: "flightradar"
}
