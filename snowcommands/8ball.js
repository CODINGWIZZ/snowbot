const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let question = args.join(" ");
    if(!question) return message.channel.send("PLEASE ENTER A QUESTION TO THE MAGIC SNOW**!**");

    if(!args[2]) return message.channel.send("PLEASE ASK A FULL QUESTION WITH AT LEAST **2** WORDS**!**");

    let answers = ["NO", "NOT TODAY", "IT IS DECIDEDLY SO", "WITHOUT A DOUBT", "YES **//** DEFINITELY", "YOU MAY RELY ON IT", "AS I SEE IT YES", "MOST LIKELY", "OUTLOOK GOOD", "SIGNS POINT TO YES", "TRY AGAIN", "TRY AGAIN LATER", "BETTER NOT TELL YOU RIGHT NOW", "CAN NOT PREDICT RIGHT NOW", "CONCENTRATE AND ASK AGAIN", "DON'T COUNT ON IT", "MY REPLY IS NO", "MY SOURCES SAY NO", "OUTLOOK NOT SO GOOD", "VERY DOUBTFUL"];
    let answersresult = Math.floor((Math.random()) * answers.length);

    message.channel.send(`:8ball: **// ${message.author.username},** ${answers[answersresult]}`);

}

module.exports.help = {
    name: "8ball"
}
