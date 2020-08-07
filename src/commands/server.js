const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const moment = require("moment");

const number = require("../../config/functions/number.js");

module.exports.run = async (bot, message, args) => {
  let vertification = {
    0: "None",
    1: "LOW",
    2: "Medium",
    3: "High",
    4: "Highest"
  };
  
  let onlineEmoji = bot.emojis.get("616306084566663188");
  let idleEmoji = bot.emojis.get("616307564484886550");
  let dndEmoji = bot.emojis.get("616307564426035229")
  let invisibleEmoji = bot.emojis.get("616306853340774421");
  
  let online = message.guild.members.filter(user => user.presence.status === "online").size;
  let idle = message.guild.members.filter(user => user.presence.status === "idle").size;
  let dnd = message.guild.members.filter(user => user.presence.status === "dnd").size;
  let invisible = message.guild.members.filter(user => user.presence.status === "offline").size;

  let channels = {};
  
  channels.textChannels = message.guild.channels.filter(channel => channel.type === "text").size;
  channels.voiceChannels = message.guild.channels.filter(channel => channel.type === "voice").size;
  channels.categories = message.guild.channels.filter(channel => channel.type === "category").size;
  channels.total = channels.textChannels + channels.voiceChannels;

  let afk = message.guild.afkChannel.name === null ? "None" : message.guild.afkChannel.name;
    
  if(message.guild.members.filter(user => !user.user.bot).size === 1) users = "USER";
  if(message.guild.members.filter(user => user.user.bot).size === 1) bots = "BOT";

  let region = message.guild.region.toUpperCase();

  if(region === "BRAZIL") region = ":flag_br:";
  if(region === "EUROPE") region = ":flag_eu:";
  if(region === "HONGKONG") region = ":flag_hk:";
  if(region === "INDIA") region = ":flag_in:";
  if(region === "JAPAN") region = ":flag_jp:";
  if(region === "RUSSIA") region = ":flag_ru:";
  if(region === "SINGAPORE") region = ":flag_sg:";
  if(region === "SOUTHAFRICA") region = ":flag_za:";
  if(region === "SYDNEY") region = ":flag_au:";
  if(region === "US-CENTRAL") region = ":flag_us:";
  if(region === "US-EAST") region = ":flag_us:";
  if(region === "US-SOUTH") region = ":flag_us:";
  if(region === "US-WEST") region = ":flag_us:";

  region = region + " " + message.guild.region.charAt(0).toUpperCase() + message.guild.region.slice(1);

  let serverinfoEmbed = new Discord.RichEmbed()
  .setColor(snow.blue)
  .setTitle(message.guild.name)
  .setThumbnail(message.guild.iconURL + "?size=2048")
  .addField("Owner", message.guild.owner)
  .addField("Vertification", vertification[message.guild.verificationLevel], true)
  .addField("Region", region, true)
  .addField("Created", moment.utc(message.guild.createdAt).format("ddd DD MMM YYYY HH:mm [UTC]").toUpperCase())
  .addField("Roles", message.guild.roles.size)
  .addField("Channels", channels.total + " " + snow.dot + " " + channels.categories + (channels.categories == 1 ? " category" : " categories") + "\n" + channels.textChannels + (channels.textChannels == 1 ? " textchannel" : " textchannels") + "\n" + channels.voiceChannels + (channels.voiceChannels == 1 ? " voicechannel" : " voicechannels"), true)
  .addField("Members", number(message.guild.memberCount) + " " + snow.dot + " " + number(online + idle + dnd) + " online\n" + message.guild.members.filter(user => !user.user.bot).size + (message.guild.members.filter(user => !user.user.bot).size == 1 ? " human" : " humans") + "\n" + message.guild.members.filter(user => user.user.bot).size + (message.guild.members.filter(user => user.user.bot).size == 1 ? " bot" : " bots"), true)
  .addField("Presences", onlineEmoji + " " + number(online) + "\n" + idleEmoji + " " + number(idle) + "\n" + dndEmoji + " " + number(dnd) + "\n" + invisibleEmoji + " " + number(invisible))
  .addField("AFK channel", afk, true)
  .addField("AFK timeout", message.guild.afkTimeout / 60 + "m", true)
  .setFooter("SNOW", bot.user.displayAvatarURL);

  message.channel.send(serverinfoEmbed);
}

module.exports.config = {
  name: "server"
}