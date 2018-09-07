const Discord = require("discord.js");
const snow = require("../snow.json");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    let rps = args.join(" ").toUpperCase();
    if(!rps) return message.channel.send("CAN'T FIND AN ANSWER WITH `ROCK // PAPER // SCISSORS`**!**");

    let chooserps = ["ROCK", "PAPER", "SCISSORS"];
    if(!chooserps.includes(rps)) return message.channel.send("PLEASE ENTER `ROCK // PAPER // SCISSORS` TO PLAY**!**"); 

    let snowanswer = chooserps[Math.floor(Math.random() * chooserps.length)];

    let result = "I WIN**!**";

    if(rps === snowanswer) {

        result = "IT'S A TIE**!**";

    } else if(rps === "ROCK") {

        if(snowanswer === "SCISSORS") {

            result = "YOU WIN**!**";

        }

    } else if(rps === "PAPER") {

        if(snowanswer === "ROCK") {

            result = "YOU WIN**!**";

        }

    } else if(rps === "SCISSORS") {

        if(snowanswer === "PAPER") {

            result = "YOU WIN**!**";

        }

    }

    message.channel.send(`**${message.author.username},** YOU CHOOSE **${rps}** AND I CHOOSE **${snowanswer}!** ${result}`);

}

module.exports.help = {
    name: "rps"
}
