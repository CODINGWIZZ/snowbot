const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const math = require("math-expression-evaluator");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async(bot, message, args) => {
  let equation = args.join(" ").toLowerCase();
  if(!equation) return message.channel.send(new Error("Equation not entered."));

  try {
    math.eval(equation);
  } catch(err) {
    return message.channel.send(new Error("Invalid math equation."));
  }

  let answer = math.eval(equation);

  let calculateEmbed = new Discord.RichEmbed()
  .setColor(snow.blue)
  .setTitle("Calculate")
  .addField("Equation", "```" + equation + "```")
  .addField("Answer", "```" + answer + "```")
  .setFooter("SNOW", bot.user.displayAvatarURL);

  message.channel.send(calculateEmbed);
}

module.exports.config = {
  name: "calculate"
}