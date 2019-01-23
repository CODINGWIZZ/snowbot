const Discord = require("discord.js");
const snow = require("../snow.json");

const fetch = require("snekfetch");
const encode = require("strict-uri-encode");

module.exports.run = async (bot, message, args) => {

    let year = args[0];
    if(!year) return message.channel.send("PLEASE ENTER THE YEAR AND THEN THE MOVIE SEARCH TERM**!**");

    let movie = encode(args.slice(1).join(" "));
    if(!movie) return message.channel.send("PLEASE ENTER A MOVIE SEARCH TERM**!**");
    
    fetch.get(`http://omdbapi.com/?t=${movie}&y=${year}&apikey=65540ce6`).then((imdbmovie) => {
        
        if(imdbmovie.body.respone === "false") {
         
            return message.channel.send("CAN'T FIND MOVIE**!**");
            
        }
        
        let movieurl = `https://imdb.com/title/${imdbmovie.body.imdbID}`;
    
        let imdbEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setThumbnail(imdbmovie.body.Poster)
        .setURL(movieurl)
        .setDescription("IMDB **" + snow.snowflake + "\n" + imdbmovie.body.Title + "\n`" + imdbmovie.body.imdbRating + "` /** `10` \n\n" + imdbmovie.body.Plot)
        .addField("YEAR // RELEASED", imdbmovie.body.Year + " **//** " + imdbmovie.body.Released, true)
        .addField("RUNTIME", imdbmovie.body.Runtime, true)
        .addField("GENRE", imdbmovie.body.Genre)
        .addField("DIRECTOR", imdbmovie.body.Director)
        .addField("WRITER", imdbmovie.body.Writer)
        .addField("ACTOR**(S)**", imdbmovie.body.Actors)
        .setFooter("IMDB | SNOW " + snow.snowflake, bot.user.displayAvatarURL);

        message.channel.send(imdbEmbed);
    
    });

}

module.exports.help = {
    name: "imdb"
}
