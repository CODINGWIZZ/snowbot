const Discord = require("discord.js");
const snow = require("../snow.json");

const Canvas = require("canvas");
const fs = require("fs");

module.exports.run = async(bot, message, args) => {

    let user;
    if(message.mentions.users.first()) {
    
      user = message.mentions.users.first().username;
    
    } else {
    
      return message.channel.send("YOU NEED TO MENTION A USER**!**");
    
    }
     
    let Image = Canvas.Image,
      canvas = new Canvas(520, 283),
      ctx: canvas.getContext("2d");
    fs.readFile("../images/deathnote.png", (err, image) => {
    
        if(err) return console.log(err);
          let img = new Image
          ctx.drawImage(img, 0, 0, 520, 283);
          ctx.font = "18px Papyrus";
          ctx.fillText(user, 275, 80)
          canvas.toBuffer((err, buff) => {
            
              if(err) return console.log(err);
              message.channel.send("DEATHNOTE**!**");
              message.channel.sendFile(buff);
          
          });
    
    });

}

module.exports.help = {
    name: "deathnote"
}
