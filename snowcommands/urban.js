const Discord = require("discord.js");
const snow = require("../snow.json");

const urban = require("relevant-urban");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}urban`) {

        let urbansearch = args.join(" ");
        if(!urbansearch) return message.channel.send("PLEASE ENTER AN ARGUMENT TO SEARCH FOR IN THE URBAN DICTIONARY DATABASE**!**");

        let res = await urban(urbansearch).catch(e => {

            return urbanMessage.edit("COULDN'T FIND THAT WORD IN THE URBAN DICTIONARY DATABASE**!**");
            return;

        });
        
        message.channel.send("SEARCHING IN THE URBAN DICTIONARY DATABASE **...**").then((urbanMessage) => {

            let urbanEmbed = new Discord.RichEmbed()
            .setColor(snow.blue)
            .setDescription("URBAN DICTIONARY **❆\n" + res.word + "**\n\n**DEFINITION:**\n" + `${res.definition}\n\n**EXAMPLE:**\n${res.example}`)
            .addField("UPVOTES [⇑]", res.thumbsUp)
            .addField("DOWNVOTES [⇓]", res.thumbsDown)
            .addField("WRITTEN BY", res.author)
            .setFooter("URBAN DICTIONARY | SNOW ❆", bot.user.displayAvatarURL);

            urbanMessage.edit(urbanEmbed);

        });

    }

}

module.exports.help = {
    name: "urban"
}
