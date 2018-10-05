const Discord = require("discord.js");
const snow = require("../snow.json");

const urban = require("relevant-urban");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    let urbansearch = args.join(" ");
    if(!urbansearch) return message.channel.send("PLEASE ENTER AN ARGUMENT TO SEARCH FOR IN THE URBAN DICTIONARY DATABASE**!**");

    let res = await urban(urbansearch).catch(e => {

        return message.channel.send("COULDN'T FIND THAT WORLD IN THE URBAN DICTIONARY DATABASE**!**");
        return;

    });

    message.channel.send("SEARCHING IN THE URBAN DICTIONARY DATABASE **...**").then((urbanMessage) => {
        
        if(urbanMessage.startsWith("RangeError:")) return message.channel.send("THE WORD YOU WANT TO SEARCH IN THE URBAN DICTIONARY LIBRARY IS TO LONG FOR THE EMBED TO HANDLE**!**");

        let urbanEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("URBAN DICTIONARY **" + snow.snowflake + "\n" + `[${res.word}](res.urbanURL)` + "**\n\n**DEFINITION:**\n" + `${res.definition}\n\n**EXAMPLE:**\n${res.example}`)
        .addField("UPVOTES [⇑]", res.thumbsUp)
        .addField("DOWNVOTES [⇓]", res.thumbsDown)
        .addField("WRITTEN BY", res.author)
        .setFooter("URBAN DICTIONARY | SNOW " + snow.snowflake, bot.user.displayAvatarURL);
        
        urbanMessage.edit(urbanEmbed);

    });

}

module.exports.help = {
    name: "urban"
}
