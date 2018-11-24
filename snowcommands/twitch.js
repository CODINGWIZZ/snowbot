const Discord = require("discord.js");
const snow = requrie("../snow.json");

module.exports.run = async(bot, message, args) => {

    let twitchuser = args[0];
    if(!twitchuser) return message.channel.send("PLEASE ENTER A STREAMER YOU WANT TO CHECK**!**");
    
    function CheckOnlineStatus()
    {
      $.ajax({
        url: "https://api.twitch.tv/streams/" + twitchuser,
        dataType: "json",
        headers: {
          "Client-ID": your_client_id
        }
        success: function(channel)
        {
          if (channel["stream"] == null)
          {
            message.channel.send(nickname + " IS NOT ONLINE**!**");
          } else {
            message.channel.send(nickname + " IS ONLINE**!**");
          }
        }
      });

}

module.exports.help = {
    twitch: "snowcommands"
}
