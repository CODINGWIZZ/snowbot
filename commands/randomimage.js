const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
  
    // RANDOM IMAGE
    if(cmd === `${prefix}randomimage` || cmd === `${prefix}randompicture`) {
     
        // let images = ["1036", "1042", "0", "255", "873", "811", "523", "47", "76", "936", "791", "314", "80", "977", "560", "798", "594", "990", "455", "519", "439", "837", "836", "387", "779", "622", "233", "243", "459", "1041", "606", "66", "980", "884", "471", "155", "168", "354", "1072", "1071", "293", "291", "292", "300"];
                                          
        const randomimages = Math.floor((Math.random()) * 1050);
        
        let imageEmbed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setDescription("RANDOM IMAGE **❆**")
        .setImage(`https://picsum.photos/1920/1080/?image=${randomimages}`);
        
        let randomimagelink = `https://picsum.photos/1920/1080/?image=${randomimages}`;
        
        return message.channel.send(imageEmbed);
        
        // message.channel.send(`**RANDOM IMAGE ❆**\n${randomimagelink}`);
        
    }


  
}

module.exports.help = {
  name: "randomimage"
} 

