const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const fetch = require("node-fetch");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async(bot, message, args) => {
	fetch("https://api.thecatapi.com/v1/images/search")
	.then(res => res.json())
	.then(data => {
		if(!data && data.length <= 0 || !data[0].url) return new Error("Image not found, please try again.");

		let catEmbed = new Discord.RichEmbed()
		.setColor(snow.blue)
		.setImage(data[0].url)
		.setFooter("SNOW", bot.user.displayAvatarURL)

		message.channel.send(catEmbed);
	});
}

module.exports.config = {
	name: "cat"
}