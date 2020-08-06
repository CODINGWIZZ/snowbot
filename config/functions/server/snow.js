const Discord = require("discord.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const snow = require("../../snow.json");

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const moment = require("moment");
const os = require("os");

const number = require("../number.js");

module.exports = function() {
  fs.readdir(path.join(__dirname, "..", "..", "..", "src", "commands"), (err, files) => {
    if(err) return console.log(err);

    let file = files.filter(f => f.split(".").pop() === "js");

    file.forEach(f => {
      let props = require(`../../../src/commands/${f}`);
      bot.commands.set(props.config.name, props);
    });
  });

  bot.on("ready", async() => { console.log(chalk.hex(snow.blue)("SNOW")); });

  bot.on("error", error => console.log(error));
  bot.on("warn", warn => console.log(warn));
  
  bot.on("guildMemberAdd", member => {
    let joinEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription("<@" + member.id + "> has joined " + member.guild.name + ".");

    let channel = member.guild.channels.find(channel => channel.name === "snow");
    if(!channel) return;

    channel.send(joinEmbed);
  });

  bot.on("guildMemberRemove", member => {
    let leaveEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription("**" + member.user.tag + "** has left " + member.guild.name + ".");

    let channel = member.guild.channels.find(channel => channel.name === "snow");
    if(!channel) return;

    channel.send(leaveEmbed);
  });

  bot.on("message", async message => {
    if(message.channel.type === "dm") return;
    if(message.author.bot === true) return;

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    if(!cmd.startsWith(prefix)) return;

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

    if(cmd === prefix) {
      let uptime = moment.duration(bot.uptime).format("D[d], H[h], m[m], s[s]");
      
      let memory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
      let totalMemory = Math.floor(os.totalmem() / 1024 / 1024);
      let percent = Math.round(memory / totalMemory * 100);

      let cpu = parseFloat(Math.round(os.loadavg()[0] * 10 / 10).toFixed(1)) + "%";

      let nightscript = bot.emojis.get("741026929129554030");
      let SNOW = bot.emojis.get("637727022180991007");

      let snowEmbed = new Discord.RichEmbed()
      .setColor(snow.blue)
      .setTitle("SNOW")
      .addField("Developer", "<@" + snow.wizz + "> " + nightscript + " " + SNOW)
      .addField("Uptime", uptime)
      .addField("Memory", "`" + memory + "/" + totalMemory + "mb` (" + percent + "%)", true)
      .addField("CPU", cpu, true)
      .addField("Command", bot.commands.size)
      .addField("Stats", number(bot.guilds.map(guild => guild.memberCount).reduce((a, b) => a + b, 0)) + " users\n" + number(bot.guilds.size) + " servers\n" + number(bot.channels.size) + " channels")
      .setFooter("SNOW", bot.user.displayAvatarURL);

      message.channel.send(snowEmbed);
    }
  });
}

bot.login(process.env.TOKEN);