const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async(bot, message, args) => {
  let question = args.join(" ");
  if(!question) return message.channel.send(new Error("Please enter a question."));

  if(!args[1]) return message.channel.send(new Error("Please ask a question with at least two words."));
  
  let answers = ["No.", "Not today.", "It is decidedly so.", "Without a doubt.", "Definitely.", "You may relay on it.", "As I see it yes.", "Most likely.", "Outlook good.", "Signs point to yes.", "Try again.", "Try again later.", "Better not tell you right now.", "Can't predict right now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."];    let result = Math.floor(Math.random() * answers.length);

  let _8ballEmbed = new Discord.RichEmbed()
  .setColor(snow.blue)
  .setTitle("8ball")
  .addField("Question", question)
  .addField("Answer", answers[result])
  .setFooter("SNOW", bot.user.displayAvatarURL);

  message.channel.send(_8ballEmbed);
}

module.exports.config = {
  name: "8ball"
}