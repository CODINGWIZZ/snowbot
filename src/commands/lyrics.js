const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const fetch = require("node-fetch");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async(bot, message, args) => {
  let song = args.join(" ");
  if(!song) return new Error("No song entered.");

  let searchEmbed = new Discord.RichEmbed()
  .setColor(snow.blue)
  .setDescription("Searching for song.")

  let searching = await message.channel.send(searchEmbed);

  fetch(`https://some-random-api.ml/lyrics?title=${song}`)
  .then(res => res.json())
  .then(data => {
    if(!data.lyrics) {
      searching.delete().then(() => {
        return message.channel.send(new Error("Song not found."));
      });
    }

    if(data.lyrics.length > 2000) {
      searching.delete().then(() => {
        return message.channel.send(new Error("This song's lyrics are too long."));
      });
    }

    let lyricsEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setTitle(data.title + " " + snow.dot + " " + data.author)
    .setDescription(data.lyrics)
    .setFooter("SNOW", bot.user.displayAvatarURL);

    searching.delete().then(() => {
      message.channel.send(lyricsEmbed);
    }); 
  });
}

module.exports.config = {
  name: "lyrics"
}