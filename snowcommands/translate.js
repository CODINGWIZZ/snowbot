const Discord = require("discord.js");
const snow = require("../snow.json");

const translate = require("google-translate-api");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}translate`) {

        let translatelanguage = args[0];
        if(!translatelanguage) return message.channel.send("PLEASE ENTER A LANGUAGE YOU WANT THE TRANSLATION TO BE IN AND THEN THE MESSAGE THAT YOU WANT TO TRANSLATE**!**");

        let translatetext = args.slice(1).join(" ");
        if(!translatetext) return message.channel.send("PLEASE ENTER THE MESSAGE THAT YOU WANT TO TRANSLATE**!**");
        
        message.channel.send("TRANSLATING **...**").then((translateMessage) => {

            translate(translatetext, {to: translatelanguage}).then((res) => {

                let translateEmbed = new Discord.RichEmbed()
                .setColor(snow.blue)
                .setDescription("TRANSLATE **❆**")
                .addField("INPUT", "```" + translatetext + "```")
                .addField("OUTPUT", "```" + res.text + "```")
                .setFooter("TRANSLATE | SNOW ❆", bot.user.displayAvatarURL);

                translateMessage.edit(translateEmbed);

            }).catch(err => {
                
                return translateMessage.edit("`" + translatelanguage.toUpperCase() + "` IS NOT A VALID LANGUAGE TO TRANSLATE**!**");

        });

      });

    }

}

module.exports.help = {
    name: "translate"
}
