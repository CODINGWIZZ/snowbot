const Discord = require("discord.js");
const snow = require("../snow.json");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    let date = new Date();
    
    var objToday = new Date(),
	    weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	    dayOfWeek = weekday[objToday.getDay()],
	    domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
	    dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
	    months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	    curMonth = months[objToday.getMonth()],
	    curYear = objToday.getFullYear()

    let dateEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription(dayOfWeek + ", " + dayOfMonth.toUpperCase() + " " + curMonth.toUpperCase() + ", " + curYear + " **" + date.toUTCString().slice(16) + "**");

    message.channel.send(dateEmbed);

}

module.exports.help = {
    name: "date"
}
