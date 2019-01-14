// COMMAND REDIT > PLEXI DEVELOPMENT > https://www.youtube.com/channel/UCQ5Qd-AwrsubVfUAMjhvhNA!

const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let spotifyuser = message.mentions.users.first() || message.author;

    if(spotifyuser.presence.game !== null && spotifyuser.presence.game.type === 2 && spotifyuser.presence.game.name === "Spotify") {

        try {    
            let trackimage = spotifyuser.presence.game.assets.largeImageURL;
            let trackURL = `https://open.spotify.com/track/${spotifyuser.presence.game.syncID}`;
            let trackname = spotifyuser.presence.game.details;
            let trackartist = spotifyuser.presence.game.state;
            let trackalbum = spotifyuser.presence.game.assets.largeText;

            const spotifyEmbed = new Discord.RichEmbed()
            .setColor(snow.blue)
            .setThumbnail(trackimage)
            .setDescription("SPOTIFY **" + snow.snowflake + "\n" + trackname + "**\n\nLISTEN TO THIS TRACK " + `[**HERE**](${trackURL})`)
            .setURL(trackURL)
            .addField("ALBUM", trackalbum, true)
            .addField("ARTIST**(S)**", trackartist, true)
            .setFooter("SPOTIFY | SNOW " + snow.snowflake, bot.user.displayAvatarURL);

            message.channel.send(spotifyEmbed);

        } catch (error) {

            return message.channel.send("ERROR**!** THE SPECIFIED USER MAY NOT BE LISTENING TO A REGISTERED TRACK**!**");

        }

    } else {

        return message.channel.send("THE SPECIFIED USER IS NOT LISTENING TO SPOTIFY**!**");

    }

}

module.exports.help = {
    name: "spotify"
}