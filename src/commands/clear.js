const Error = require("../../config/functions/server/error.js");

module.exports.run = async(bot, message, args) => {
  let amount = isNaN(args[0]) ? parseInt(args[1]) : parseInt(args[0]);
  if(!amount) return message.channel.send(Error("Please enter a certain number you want to delete."));
  
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Error("You don't have permission to use this command."));
  
  if(amount < 0) return message.channel.send(new Error("I can't clear a negative amount of messages."));
  if(amount > 99) return message.channel.send(new Error("I can't clear an amount above 99 messages."));

  message.delete().then(() => {
    message.channel.bulkDelete(amount);
  });
}

module.exports.config = {
  name: "clear"
}