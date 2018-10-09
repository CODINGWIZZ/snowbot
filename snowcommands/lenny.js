const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let lanny = ["( ͡° ͜ʖ ͡°)", "(☭ ͜ʖ ☭)", "(ᴗ ͜ʖ ᴗ)", "( ° ͜ʖ °)", "(⟃ ͜ʖ ⟄)", "( ‾ ʖ̫ ‾)", "(͠≖ ͜ʖ͠≖)", "( ͡° ʖ̯ ͡°)", "ʕ ͡° ʖ̯ ͡°ʔ", "( ͡° ل͜ ͡°)", "( ͠° ͟ʖ ͡°)", "( ͠° ͟ʖ ͠°)", "( ͡~ ͜ʖ ͡°)", "( ͡o ͜ʖ ͡o)", "( ͡◉ ͜ʖ ͡◉)", "( ͡☉ ͜ʖ ͡☉)", "( ͡° ͜V ͡°)", "ʕ ͡° ͜ʖ ͡°ʔ", "( ͡ᵔ ͜ʖ ͡ᵔ )", "( ͡° ͜ʖ ͡ °)"];
    let lannyrandom = Math.floor((Math.random()) * lanny.length);
    
    message.channel.send(lanny[lannyrandom]);

}

module.exports.help = {
    name: "lanny"
}
