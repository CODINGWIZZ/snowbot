const Discord = require("discord.js");
const snow = require("../snow.json");

const encode = require("strict-uri-encode");
const got = require("got");
const API_KEY = "SJBFr7rJmHOiLhZfF2KGGnOGTOqJI0kO";

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}gif`) {

        let gif = encode(args.join(" "));
        if(!gif) return message.channel.send("PLEASE ENTER A GIF QUERY TO SEARCH FOR**!**");

        const res = await got(`http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}?tag=${encodeURIComponent(gif)}`, { json: true });

        message.channel.send("SEARCHING GIFS **...**").then((gifMessage) => {

            if(!res || !res.body || !res.body.data) return message.channel.send("FAILED TO LOAD GIF**!**");

            let gifEmbed = new Discord.RichEmbed()
            .setColor(snow.blue)
            .setDescription("GIF **❆**")
            .setImage(res.body.data.image_url);

            gifMessage.edit(gifEmbed);

        });

    }

}

module.exports.help = {
    name: "gif"
}
