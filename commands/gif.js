const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const got = require("got");

const API_KEY = "SJBFr7rJmHOiLhZfF2KGGnOGTOqJI0kO";

module.exports.run = async (bot, message, args) => {

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    // GIF COMMAND
    if(cmd === `${prefix}gif`) {

        const res = await got(`http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${encodeURIComponent(args.join(" "))}`, { json: true });

        if(!args[0]) return message.channel.send("PLEASE ENTER A GIF SEARCH MESSAGE**!**");
    
        message.channel.send("LOADING GIF **...**").then(snowgifmessage => {
    
        if(!res || !res.body || !res.body.data) return snowgifmessage.edit("FAILED TO LOAD GIF**!**");
    
        let gifEmbed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setDescription("GIF **❆**")
        .setImage(res.body.data.image_url);
    
        if (res.body.data.image_url = snowgifmessage.edit(gifEmbed));
    
    });
    
        }
        
}

module.exports.help = {
    name: "gif"
}
