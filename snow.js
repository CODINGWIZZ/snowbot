const botconfig = require("./botconfig.json");
const countries = require("country-data").countries.all;
const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const urban = require("relevant-urban");
const got = require("got");
const convert = require("color-convert");
const superagent = require("superagent");
const math = require("math-expression-evaluator"); 
const stripIndents = require("common-tags").stripIndent;
const shorten = require("isgd");
const fortnite = require("fortnite");
const ft = new fortnite("5e9103e1-e035-4fe5-b4e6-35ae1c386402");
const cheerio = require("cheerio");
    snekfetch = require("snekfetch");
    querystring = require("querystring");
const weather = require("weather-js");
const encode = require("strict-uri-encode");

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
let cooldown = new Set;
let cdseconds = 5;

// COMMAND HANDLER
fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {

        console.log("NO COMMANDS!");
        return;

    }

    jsfile.forEach((f, i) => {

        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);

    });

});

bot.on("ready", async () => {
    console.log(`SNOW IS BACK ONLINE ON ${bot.guilds.size} SERVERS!`);
  
    bot.user.setStatus("ONLINE");

    // bot.user.setActivity("SNOW ❆ // s!");

    // bot.user.setActivity("HAVING PROLEMS ❆");

    // bot.user.setActivity("SNOW ❆ | s!", { type: "STREAMING"});
    
    bot.user.setGame("SNOW ❆  |  s!", "https://twitch.tv/WIZZ_SNOW");
  
});

bot.on("guildMemberAdd", member => {
   
       let guildmemberaddEmbed = new Discord.RichEmbed()
       .setColor(botconfig.blue)
       .setDescription("\n**" + member + "** HAS JOINED **" + member.guild.name + "!** WE ARE NOW **" + member.guild.memberCount + "** MEMBERS**!**\n");
   
       let snowlog = member.guild.channels.find(`name`, "snow");
       if(!snowlog) return;
    
       snowlog.send(guildmemberaddEmbed);
    
});

bot.on("guildMemberRemove", member => {
   
        let guildmemberremoveEmbed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setDescription("\n**" + member.user.username + "** HAS LEFT **" + member.guild.name + "!** WE ARE NOW DOWN TO **" + member.guild.memberCount + "** MEMBERS**!**\n");
    
        let snowlog = member.guild.channels.find(`name`, "snow");
        if(!snowlog) return;
        
        snowlog.send(guildmemberremoveEmbed);
    
});

bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();
    let args = messageArray.slice(1);

    if(!cmd.startsWith(prefix)) return;
    
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

    if (bot.user.id === message.author.id) return;

    //console.log(`level is ${xp[message.author.id].level}`);

    // BOT UPTIME SETTINGS / SETUP
    let ms = bot.uptime;
    let cd = 24 * 60 * 60 * 1000; // CALCULATE DAYS
    let ch = 60 * 60 * 1000; // CALCULATE HOURS
    let cm = 60 * 1000; // CALCULATE MINUTES
    let cs = 1000; // CALCULATE SECONDS
    let days = Math.floor(ms / cd);
    let dms = days * cd; // DAYS, IN MS
    let hours = Math.floor((ms - dms) / cd);
    let hms = hours * ch; // HOURS, IN MS
    let minutes = Math.floor((ms - dms - hms) / cm);
    let mms = minutes * cm; // MINUTES, IN MS
    let seconds = Math.floor((ms - dms - hms - mms) / cs);
    
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }

    if (minutes === 60) {
        hours++;
        minutes = 0;
    }

    if (hours === 24) {
        days++;
        hours = 0;
    }

    let dateStrings = [];
    if (days === 1) {
        dataStrings.push("1 DAY, ");
    } else if (days > 1) {
        dateStrings.push(String(days) + " DAYS, ");
    }
    if (hours === 1) {
        dateStrings.push("1 HOUR, ");
    } else if (hours > 1) {
        dateStrings.push(String(hours) + " HOURS, ");
    }
    if (minutes === 1) {
        dateStrings.push("1 MINUTE, ");
    } else if (minutes > 1) {
        dateStrings.push(String(minutes) + " MINUTES, ");
    } 
    if (seconds === 1) {
        dateStrings.push("1 SECOND");
    } else if (seconds > 1) {
        dateStrings.push(String(seconds) + " SECONDS")
    }

    let dateString = " ";
    // for (let i = 0; i < dateStrings.length - 1; i++) {
    //     dateString += dateStrings[i];
    //     dateString += ", ";
    // }
    // if (dateStrings.length >= 2) {
    //     dateString = dateString.slice(0, dateString.length- 2) + dateString.slice(dateString.length - 1);
    //     dateString += "AND "; 
    // }
    dateString += dateStrings[dateStrings.length - 1];

    // SEARCH
   // if(cmd === `${prefix}search`) {

       // let googleMessage = args.join(" ");
     //   if(!googleMessage) return message.channel.send("PLEASE ENTER A MESSSAGE YOU WAN TO SEARCH FOR**!**");

        //message.channel.send("SEARCHING **...**").then(searchMessage => {

        //let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(googleMessage)}`;
        //return snekfetch.get(searchUrl).then((result) => {

          //  let $ = cheerio.load(result.text);

            //let googleData = $('.r').first().find('a').first().attr('href');

           // googleData = querystring.parse(googleData.replace('/url?', ''));
          //  return searchMessage.edit(`RESULT FOUND**!**\n${googleData.q}`).then(msg => msg.delete(20000));

        // }).catch((err) => {
           // return message.channel.send("NO RESULTS FOUND**!**");
        // });
        // });
        // }

    // CHECK A CITY'S FLAG
    // if(cmd === `${prefix}flag`) {

    //     const makeURL2 = (city) => `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${encodeURIComponent(city)}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;

    //     if(!args[0]) return message.channel.send("PLEASE ENTER A CITY YOU WANT TO CHECK THE FLAG FOR**!**");

    //     const res = got(makeURL2(args.join(" ")), { json: true });

    //     message.channel.send("THE FLAG IS BEING REQUESTED **...**").then((snow) => {

    //     if (!res || !res.body || !res.body.query || !res.body.query.results || !res.body.query.results.channel) {
    //         return snow.edit("COULN'T CHECK FLAG**!**");
    //       }

    //     const weatherInfo = res.body.query.results.channel;
    //     const forecast = weatherInfo.item.forecast[0];

    //     weather.find({search: args.join(" "), degreeType: "F"}, function(err, result) {
    //         //if (err) message.channel.send(err);

    //         const city = args.join(" ");
    //         if(!city) return message.channel.send("PLEASE ENTER A CITY YOU WANT TO CHECK THE FLAG FOR**!**");

    //     const countryInfo = countries.find(country => country.name === weatherInfo.location.country);
    //     const countryEmoji = countryInfo ? countryInfo.emoji : " ";

    //     var current = result[0].current;
    //     var location = result[0].location;

    //         snow.edit(`**${city}**'s FLAG**:**\n${countryEmoji}`)

    //     })
        

    // })

    // }

    // EMBED [OWNER ONLY]
    if(cmd === `${prefix}ownerembed`) {

    if(message.member =! "297832577782382592") return;
    let embedMessage = args.join(" ");

    let embedEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setDescription(embedMessage);

    message.delete();

    message.channel.send(embedEmbed);

    }

    // OWNER ONLY // SAY COMMAND
    if(cmd === `${prefix}ownersay`) {

    message.delete();

    if(message.member =! "297832577782382592") return;
    if(!args[0]) return;

    let ownersayMessage = args.join(" ");

    return message.channel.send(ownersayMessage);
 
    }

    // BOT SETTINGS
    if(cmd === `${prefix}restart`) {

    if(message.member =! "297832577782382592") return;
    bot.destroy();
    
    setTimeout(function () {
        bot.login(process.env.token);
        message.channel.send("RESTARTED **...**");
        console.log("RESTARTED ...")
    }, 3000)

    }

    if(cmd === `${prefix}shutdown`) {

    if(message.member =! "297832577782382592") return;
    message.channel.send("SHUTTING DOWN **...**");
    bot.destroy();
    console.log("SHUTDOWN ...")

    }
   
    
    if(cmd === `${prefix}frank`) {
     
        let frankEmbed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setImage("https://i.imgur.com/e615DSC.png")
        .setDescription("FRANK **❆**");
        
        return message.channel.send(frankEmbed);
        
    }
    
});

bot.login(process.env.token);
