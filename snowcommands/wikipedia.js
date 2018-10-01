const Discord = require("discord.js");
const snow = require("../snow.json");

import wiki from "wikipediajs";

const wiki = require("wikipediajs");

module.exports.run = async (bot, message, args) => {

    let wikipedia = args.join(" ");
    if(!wikipedia) return message.channel.send("PLEASE ENTER A WIKI SEARCH TERM**!**");
    
    wiki.search(wikipedia).then((res) => {
    
        let wikiEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescriptioption(res);
        
        message.channel.send(wikiEmbed);
        
        .catch((error) => console.log(error);
      
    });

}

module.exports.help = {
    name: "wikipedia"
}
