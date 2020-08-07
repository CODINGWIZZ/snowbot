const figlet = require("figlet");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async(bot, message, args) => {
  let ascii = args.join(" ");
  if(!ascii) return message.channel.send(new Error("Message not entered."));

  if(ascii.length > 14) return message.channel.send(new Error("Ascii can't exceed 14 characters."));

  figlet(ascii, function(err, data) {
    if(err) return message.channel.send(new Error("There was an error with this command."));
    
    message.channel.send(data, {
      code: "AsciiArt"
    });
  });
}

module.exports.config = {
  name: "ascii"
}