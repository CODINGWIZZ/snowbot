const botconfig = require("./botconfig.json");
const countries = require("country-data").countries.all;
const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const urban = require("relevant-urban");
const got = require("got");
const convert = require("color-convert");
const moment = require("moment");
const superagent = require("superagent");
const math = require("math-expression-evaluator"); 
const stripIndents = require("common-tags").stripIndent;
const fetch = require("node-fetch");
const shorten = require("isgd");
const fortnite = require("fortnite");
const ft = new fortnite("5e9103e1-e035-4fe5-b4e6-35ae1c386402");
const cheerio = require("cheerio");
    snekfetch = require("snekfetch");
    querystring = require("querystring");
const weather = require("weather-js");
const encode = require("strict-uri-encode");

const bot = new Discord.Client();
let xp = require("./xp.json");
bot.commands = new Discord.Collection();
let cooldown = new Set;
let cdseconds = 5;
const API_KEY = "dc6zaTOxFJmzC";

bot.on("ready", async () => {
    console.log(`SNOW IS BACK ONLINE ON ${bot.guilds.size} SERVERS!`);
  
    bot.user.setStatus("ONLINE");

    bot.user.setActivity("SNOW ❆");

    // bot.user.setActivity("HAVING PROLEMS ❆");

    // bot.user.setActivity("EUROVISION FINAL!", { type: "WATCHING"});
    
    //bot.user.setGame("WIZZ | SNOW ❆", "https://twitch.tv/WIZZ_SNOW");
    
});

bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();
    let args = messageArray.slice(1);

    if(!cmd.includes(`${prefix}`)) return;
    
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

    if (bot.user.id === message.author.id) return;

    // ROLL THE DICE
    if(cmd === `${prefix}roll`) {

        let roll = Math.floor((Math.random() * 6 + 1))

        return message.channel.send("**" + message.author.username + ",** YOU ROLLED ** " + roll + "!**");
    }

    // PING COMMAND
    if(cmd === `${prefix}ping`) {

        const ping = bot.pings[0];
        
        message.channel.send('PINGING **...**').then(pingMessage => {
            pingMessage.edit("THE PING IS `" + ping + "ms`**!**");
        });

    }

    // TEMPMUTE A MEMBER
    if(cmd === `${prefix}tempmute`) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
        // if(!permissions.has("MANAGE_MEMBERS")) return message.channel.send("CANNOT DO THAT **-** MAKE SURE I HAVE THE RIGHT PERMISSIONS**!**");
            
        let tmUser = message.guild.member(message.mentions.members.first()) || message.guild.members.get(args[0]);
        if(!tmUser) return message.channel.send("CAN'T FIND USER**!**");

        if(tmUser.id === message.author.id) return message.channel.send("YOU CAN'T MUTE YOURSELF**!**");
        if(tmUser.highestRole.position >= message.member.highestRole.position) return message.channel.send("CAN NOT MUTE A MEMBER WHO HAS A HIGHER OR THE SAME ROLE AS YOU**!**");
     
        let muterole = message.guild.roles.find(`name`, `MUTED / ❆`);    
        if(!muterole) {
            try {
                role = await message.guild.createRole({
                    name: "MUTED / ❆",
                    color: "#65798d",
                    permissions: []
                }); 

                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(role, {
                        SEND_MESSAGES: false,
                        SPEAK: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch(e) {
              //  console.log(e.stack);
            }
        }

        if(tmUser.roles.has(muterole)) return message.channel.send("THIS USER IS ALREADY MUTED**!**");

        await(tmUser.addRole(muterole));        
        message.channel.send(`${tmUser} HAS BEEN **MUTED!**`);

        let tempmutEmbed = new Discord.RichEmbed()
        .setTitle("TEMPMUTE ❆")
        .setTimestamp()
        .setColor(botconfig.blue)
        .addField("USER", tmUser)
        .addField("MODERATOR", message.author)
        .addField("CHANNEL", message.channel)
        .setFooter("SNOW ❆", bot.user.displayAvatarURL);

        let snowlog = message.guild.channels.find(`name`, "snow-log");
        if(!snowlog) return;

        snowlog.send(tempmuteEmbed);

    }

    // UNMUTE A MEMBER
    if(cmd === `${prefix}unmute`) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSION TO DO THAT**!**");
        // if(!permissions.has("MANAGE_MEMBERS")) return message.channel.send("CANNOT DO THAT **-** MAKE SURE I HAVE THE RIGHT PERMISSIONS**!**");

        let muteUser = message.guild.member(message.mentions.members.first()) || message.guild.members.get(args[0]);
        if(!muteUser) return message.channel.send("CAN'T FIND USER**!**");

        let muterole = message.guild.roles.find(`name`, `MUTED / ❆`);

        if(!muteUser.roles.has(muterole)) return message.channel.send("THIS USER IS NOT MUTED**!**");

        await(muteUser.removeRole(muterole));
        message.channel.send(`${muteUser} HAS BEEN **UNMUTED!**`);

        let unmuteembed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setTimestamp()
        .setTitle("UNMUTE ❆")
        .addField("USER", muteUser)
        .addField("MODERATOR", message.author)
        .addField("CHANNEL", message.channel)
        .setFooter("SNOW ❆", bot.user.displayAvatarURL);

        let snowlog = message.guild.channels.find(`name`, "snow-log");
        if(!snowlog) return;

        snowlog.send(unmuteembed);

    }

    // TEMPDEAFEN A MEMBER
    if(cmd === `${prefix}tempdeafen`) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
        // if(!permissions.has("MANAGE_MEMBERS")) return message.channel.send("CANNOT DO THAT **-** MAKE SURE I HAVE THE RIGHT PERMISSIONS**!**");

        let tdUser = message.guild.member(message.mentions.members.first()) || message.guild.members.get(args[0]);
        if(!tdUser) return message.channel.send("CAN'T FIND USER**!**");

        if(tdUser.id === message.author.id) return message.channel.send("YOU CAN'T DEAFEN YOURSELF**!**");
        if(tdUser.highestRole.position >= message.member.highestRole.position) return message.channel.send("CAN NOT DEAFEN A MEMBER WHO HAS HIGER OR THE SAME ROLE AS YOU**!**");

        let deafenrole = message.guild.roles.find(`name`, `DEAFENED / ❆`);
        if(!deafenrole) {
            try {
                role = await message.guild.createRole({
                    name: "DEAFENED / ❆",
                    color: "#65798d",
                    permissions: []
                });

                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(role, {
                        SPEAK: false
                    });
                });
            } catch(e) {
               // console.log(e.stack);
            }
        }

        if(tdUser.roles.has(deafenrole.id)) return message.channel.send("THIS USER IS ALREADY MUTED**!**");

                
        await(tdUser.addRole(deafenrole.id));
        message.channel.send(`${tdUser} HAS BEEN **DEAFENED!**`);

        let tempdeafenembed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setTimestamp()
        .setTitle("TEMPDEAFEN ❆")
        .addField("USER", tdUser)
        .addField("MODERATOR", message.channel)
        .addField("CHANNEL", message.channel)   
        .setFooter("SNOW ❆", bot.user.displayAvatarURL);

        let snowlog = message.guild.channels.find(`name`, "snow-log");
        if(!snowlog) return; 

        snowlog.send(tempdeafenembed);

    }

    // UNDEAFEN A MEMBER
    if(cmd === `${prefix}undeafen`) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
        // if(!permissions.has("MANAGE_MEMBERS")) return message.channel.send("CANNOT DO THAT **-** MAKE SURE I HAVE THE RIGHT PERMISSIONS**!**");

        let deafenUser = message.guild.member(message.mentions.members.first()) || message.guild.members.get(args[0]);
        if(!deafenUser) return message.channel.send("CAN'T FIND THAT USER**!**");

        let deafenrole = message.guild.roles.find(r => r.name === "DEAFENED / ❆");

        if(!deafenrole || !deafenUser.roles.has(deafenrole.id)) return message.channel.send("THIS USER IS NOT DEAFENED**!**");

        await(deafenUser.removeRole(deafenrole.id));        
        message.channel.send(`${deafenUser} HAS BEEN **UNDEAFENED!**`);

        let undeafenembed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setTitle("UNDEAFEN ❆")
        .addField("USER", deafenUser)
        .addField("MODERATOR", message.author)
        .addField("CHANNEL", message.channel)
        .setFooter("SNOW ❆", bot.user.displayAvatarURL);

        let snowlog = message.guild.channels.find(`name`, "snow-log");
        if(!snowlog) return;

        return snowlog.send(undeafenchannel);

    }

    // SAY A MESSAGE THROUGH THE BOT
    if(cmd === `${prefix}say`) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
        // if(!permissions.has("MANAGE_MESSAGES")) return message.channel.send("CANNOT DO THAT **-** MAKE SURE I HAVE THE RIGHT PERMISSIONS**!**");
        const sayMessage = args.join(" ");
        if(!args[0]) return message.channel.send("PLEASE ENTER A MESSAGE YOU WANT TO SAY THROUGH THE BOT**!**");

        message.delete().catch(O_o=>{});
        message.channel.send("**" + message.author.username + "** SAID THROUGH THE BOT**:**" + "\n\n" + sayMessage);
    }

    // SERVER INFO

    if(cmd === `${prefix}serverinfo`) {

        const vertification = {
            0: "NONE",
            1: "LOW",
            2: "MEDIUM",
            3: "(╯°□°）╯︵ ┻━┻",
            4: "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻"
        };

        let serverinfoEmbed = new Discord.RichEmbed()
        .setAuthor("SERVER INFO ❆")
        .setColor(botconfig.blue)
        .setDescription("**" + message.guild.name + "** **(** " + message.guild.id + " **)**")       
        .setThumbnail(message.guild.iconURL)
        .addField("OWNER", message.guild.owner + " **(** " + message.guild.owner.id + " **)**")
        .addField("CREATED", message.guild.createdAt.toDateString())
        .addField("YOU JOINED", message.guild.joinedAt.toDateString())
        .addField("VERIFICATION LEVEL", vertification[message.guild.verificationLevel])
        .addField("REGION", message.guild.region, true)
        .addField("CHANNELS", message.guild.channels.size, true)
        .addField("MEMBERS", message.guild.memberCount, true)
        .addField("TOTAL ROLES", message.guild.roles.size, true)
        .setFooter("SERVER INFO | SNOW ❆", bot.user.displayAvatarURL);

        return message.channel.send(serverinfoEmbed);
    }

    // USER INFO
    if(cmd === `${prefix}userinfo`) {

        let user = message.mentions.users.first() || message.guild.members.get(args [0]) || message.author;
        if(!user) return message.channel.send("CAN'T FIND USER**!**");

        let userinfoEmbed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setDescription("**" + user.username + "**")
        .setAuthor("USER INFO ❆")
        .addField("FULL NAME", `**${user.username}**#${user.discriminator}`)
        .addField("ID", user.id)
        .addField("JOINED THIS SERVER", user)
        .addField("CREATED", user.guild.joinedAt.toDateString())
        .setFooter("USER INFO | SNOW ❆", user.displayAvatarURL);

        return message.channel.send(userinfoEmbed);
    }

    // ROLE INFO

    if(cmd === `${prefix}roleinfo`) {

        let truefalse = {
            true: "TRUE",
            false: "FALSE"
        }

        let role = args.join(" ");
        if(!role) return message.channel.send("SPECIFY A ROLE**!**");
        let infoRole = message.guild.roles.find(`name`, role);
        if(!infoRole) return message.channel.send("CAN'T FIND ROLE**!**");

        let inforoleEmbed = new Discord.RichEmbed()
        .setAuthor("ROLE INFO ❆")
        .setDescription("**" + infoRole.name + "**")
        .addField("ID", infoRole.id)
        .addField("COLOR", "HEX**:**\n" + infoRole.hexColor + "\n\n")
        .setColor(botconfig.blue)
        .addField("CREATED", infoRole.createdAt.toDateString())
        .addField("HOISTED", truefalse[infoRole.hoist])
        .addField("MANAGED", truefalse[infoRole.managed])
        .addField("MENTIONABLE", truefalse[infoRole.mentionable])
        .setFooter("ROLE INFO | SNOW ❆", bot.user.displayAvatarURL);

        return message.channel.send(inforoleEmbed);

    }

    // THE XP SYSTEM
    let xpAdd = Math.floor(Math.random() * 7) + 8;

    //console.log(xpAdd);

    // if (!xp[message.author.id + message.guild.id]) xp[message.author.id + message.guild.id] = {}
    if(!xp[message.author.id + message.guild.id]){
        xp[message.author.id + message.guild.id] = {
            xp: 0,
            level: 1
        };
    }

    let curxp = xp[message.author.id + message.guild.id].xp;
    let curlvl = xp[message.author.id + message.guild.id].level;
    let nxtlvl = curlvl * 600;
    xp[message.author.id + message.guild.id].xp = curxp + xpAdd;
    if(nxtlvl <= xp[message.author.id + message.guild.id].xp){
        xp[message.author.id + message.guild.id].level = curlvl + 1;

    let lvlupEmbed = new Discord.RichEmbed()
    .setTitle("LEVEL UP! ❆")
    .setColor(botconfig.blue)
    .addField("New Level", curlvl + 1)
    .setDescription("**" + message.author.username + "**")

    message.channel.send(lvlupEmbed)

        // message.channel.send("**" + message.author.username + ",** YOU HAVE LEVELED UP TO THE LEVEL **" + curlvl + 1 + "!**");
    
    }

    fs.writeFile("./xp.json", JSON.stringify(xp), (err) =>{

        if(err) console.log(err);

    });

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

    // INFO ABOUT SNOW
    if(cmd === `${prefix}snowinfo`) {
        let snowinfoembed = new Discord.RichEmbed()
        .setDescription("**BOT INFORMATION ❆**")
        .setColor(botconfig.blue)
        .addField("BOT NAME", bot.user.username)
        .addField("OWNER / DEVELOPER", "**WIZZ**#7897 **[<:VILGOTNI:409785943676026890>]**")
        .addField("VERSION", "**SNOW** ❆ | **1.9.0**")
        .addField("WEBSITE", "https://discordsnowbot.weebly.com/")
        .addField("STATS", `**${bot.guilds.size} SERVERS\n\n${bot.channels.size} CHANNELS\n\n${bot.users.size} USERS**`)
        .addField("UPTIME", dateString)
        .setFooter("BOT INFORMATION | SNOW ❆", bot.user.displayAvatarURL);
        
        return message.channel.send(snowinfoembed);

    }

    // INVITE SNOW
    if(cmd === `${prefix}snowinvite`) {

        let inviteembed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setDescription("`INVITE SNOW:`\nhttps://bit.do/snowbot\n`TWITTER:`\nhttps://bit.do/snowtwitter\n`WIZZ TWITTER:\nhttps://bit.do/codingwizz`")
        .setFooter("INVITE BOT | SNOW ❆", bot.user.displayAvatarURL);

        return message.channel.send(inviteembed);
    }

    // SEARCH / GOOGLE
    if(cmd === `${prefix}search`) {

        let googleMessage = args.join(" ");
        if(!googleMessage) return message.channel.send("PLEASE ENTER A MESSSAGE YOU WAN TO SEARCH FOR**!**");

        message.channel.send("SEARCHING **...**").then(searchMessage => {

        let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(googleMessage)}`;
        return snekfetch.get(searchUrl).then((result) => {

            let $ = cheerio.load(result.text);

            let googleData = $('.r').first().find('a').first().attr('href');

            googleData = querystring.parse(googleData.replace('/url?', ''));
            return searchMessage.edit(`RESULT FOUND**!**\n${googleData.q}`).then(msg => msg.delete(20000));

        }).catch((err) => {
            return message.channel.send("NO RESULTS FOUND**!**");
        });
        });
        }

        // FLIP A COIN
        if(cmd === `${prefix}flipcoin` || cmd === `${prefix}coin`) {

            let coin = ["HEADS", "TAILS"];

            let coinrandom = Math.floor((Math.random()) * coin.length);

            return message.channel.send("**" + message.author.username + ",** I CHOOSE **" + coin[coinrandom] + "!**");

        }

        // CHECK FORECAST
        if(cmd === `${prefix}forecast`) {   
            
            const forecastday = {

                Monday: "MONDAY",
                Tuesday: "TUESDAY",
                Wednesday: "WEDNESDAY",
                Thursday: "THURSDAY",
                Friday: "FRIDAY",
                Saturday: "SATURDAY",
                Sunday: "SUNDAY"

            };

            let makeURL1 = (city) => `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${encodeURIComponent(city)}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;

            if(!args[0]) return message.channel.send("PLEASE ENTER A CITY YOU WANT TO CHECK FORECAST FOR**!**");

            const res = got(makeURL1(args.join(" ")), { json: true });

            message.channel.send("THE FORECAST IS BEING REQUESTED **...**").then((snow) => {

            if (!res || !res.body || !res.body.query || !res.body.query.results || !res.body.query.results.channel) {
                return message.channel.send("COULDN'T CHECK FORECAST**!**");
              }

            const weatherInfo = res.body.query.results.channel;
            const forecast = weatherInfo.item.forecast[0];

            weather.find({search: args.join(" "), degreeType: "F"}, function(err, result) {
                //if (err) message.channel.send(err);

            const city = args.join(" ");
            if(!city) return message.channel.send("PLEASE ENTER A CITY YOU WANT TO CHECK FORECAST FOR**!**");

            const countryInfo = countries.find(country => country.name === weatherInfo.location.country);
            const countryEmoji = countryInfo ? countryInfo.emoji : " ";

            const celsius = (fahrenheit) => Math.round(((fahrenheit - 32) * 5) / 9);

            var current = result[0].current;
            var location = result[0].location;

            let forecastEmbed = new Discord.RichEmbed()
            .setColor(botconfig.blue)
            .setAuthor("FORECAST   ☁")
            .setTitle(`${countryEmoji}\n/\n${result[0].location.name}`)
            .setTimestamp()
            .setDescription("**" + forecastday[result[0].forecast[1].day] + "**\nLOW: " + celsius(result[0].forecast[1].low) + "**°C / ** "+ result[0].forecast[1].low + "**°F**\nHIGH: " + celsius(result[0].forecast[1].high) + "**°C / **" + result[0].forecast[1].high + "**°F**\n`" + result[0].forecast[1].skytextday + "`\n\n" + "**" + forecastday[result[0].forecast[2].day] + "**\nLOW: " + celsius(result[0].forecast[2].low) + "**°C / **" + result[0].forecast[2].low + "**°F**\nHIGH: " + celsius(result[0].forecast[2].high) + "**°C / **" + result[0].forecast[2].high + "**°F**\n`" + result[0].forecast[2].skytextday + "`\n\n**" + forecastday[result[0].forecast[3].day] + "**\nLOW: " + celsius(result[0].forecast[3].low) + "**°C / **" + result[0].forecast[3].low + "**°F**\nHIGH: " + celsius(result[0].forecast[3].high) + "**°C / **" + result[0].forecast[3].high + "**°F**\n`" + result[0].forecast[3].skytextday + "`\n\n**" + forecastday[result[0].forecast[4].day] + "**\nLOW: " + celsius(result[0].forecast[4].low) + "**°C / **" + result[0].forecast[4].low +"**°F**\nHIGH: " + celsius(result[0].forecast[4].high) + "**°C / **" + result[0].forecast[4].high + "**°F**\n`" + result[0].forecast[4].skytextday + "`")
            .setFooter("FORECAST | SNOW ❆", bot.user.displayAvatarURL);

            snow.edit(forecastEmbed);

         });
            
     });

    }

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

    // CALCULATE

    if(cmd === `${prefix}calculate` || cmd === `${prefix}calculator`) {

    const question = args.join(" ");
    if(!question) return message.channel.send("YOU MUST PROVIDE A EQUATION IF YOU WANT TO CACULATE**!**");

    let answer = math.eval(question);
    try {
    } catch (err) {
        return message.channel.send("INVILID MATH EQUATION**!**");
    }

    let mathEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setDescription("**CALCULATOR ❆**")
    .addField("EQUATION", `\`\`\`${question}\`\`\``)
    .addField("ANSWER", `\`\`\`${answer}\`\`\``)
    .setFooter("CALCULATOR | SNOW ❆", bot.user.displayAvatarURL);

    message.channel.send(mathEmbed);
}

    // PLAY ROCK PAPER SCISSORS WITH THE BOT

if(cmd === `${prefix}rps`) {

    let rpsanswer = args.join(" ").toUpperCase();
    if(!rpsanswer) return message.channel.send("CAN'T FIND THE  MESSAGE**!**");

    let rps = ["ROCK", "PAPER", "SCISSORS"];

    if(!rps.includes(rpsanswer)) {

        return message.channel.send("PLEASE ENTER ROCK **/** PAPER **/** SCISSORS TO PLAY**!**");

    }

    let snowrpsanswer = rps[Math.floor(Math.random() * rps.length)];

    let result = "I WIN**!**";

    if(rpsanswer === snowrpsanswer) {
        result = "IT'S A TIE**!**";
    }
    else if (rpsanswer === "ROCK") {
        if(snowrpsanswer === "SCISSORS") {
            result = "YOU WIN**!**";
        }
    }
    else if (rpsanswer === "PAPER") {
        if(snowrpsanswer === "ROCK") {
            result = "YOU WIN**!**";
        }
    }
    else if (rpsanswer === "SCISSORS") {
        if(snowrpsanswer === "PAPER") {
            result = "YOU WIN**!**";
        }
    }

    message.channel.send(`**${message.author.username},** YOU CHOOSE **${rpsanswer}** AND I CHOOSE **${[snowrpsanswer]}!** ${result}`);

}

    // CHECK AVATAR
    if(cmd === `${prefix}avatar`) {

    const avatar = message.mentions.users.first() || message.author;
    
    if (!avatar.avatarURL) return message.channel.send("CAN'T FIND AVATAR**!**");

    let avatarEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setAuthor(avatar.username + "  /  AVATAR ❆")
    .setTitle("[DOWNLOAD]")
    .setURL(avatar.avatarURL)
    .setImage(avatar.avatarURL)
    .setFooter("AVATAR | SNOW ❆", bot.user.displayAvatarURL);

    return message.channel.send(avatarEmbed);

}

    // 8BALL COMMAND
    if(cmd === `${prefix}8ball`) {

    if(!args[2]) return message.channel.send("PLEASE ASK A QUESTION**!**");

    let question = args.slice(0).join(" ");

    let answers = ["NO", "NOT TODAY", "IT IS DECIDEDLY SO", "WITHOUT A DOUBT", "YES **/** DEFINITELY", "YOU MAY RELY ON IT", "AS I SEE IT YES", "MOST LIKELY", "OUTLOOK GOOD", "SIGNS POINT TO YES", "TRY AGAIN", "ASK AGAIN LATER", "BETTER NOT TELL YOU RIGHT NOW", "CAN NOT PREDICT RIGHT NOW", "CONCENTRATE AND ASK AGAIN", "DON'T COUNT ON IT", "MY REPLY IS NO", "MY SOURCES SAY NO", "OUTLOOK NOT SO GOOD", "VERY DOUBTFUL"];

    let answerresult = Math.floor((Math.random() * answers.length));

    message.channel.send(`:8ball: **|** **${message.author.username},** ${answers[answerresult]}**!**`);

}

    // ANNOUNCE COMMAND
    if(cmd === `${prefix}announce`) {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");

    let announcechannel = message.mentions.channels.first();
    if(!announcechannel) return message.channel.send("PLEASE MENTION A CHANNEL AND THEN THE ANNOUNCE MESSAGE**!**");

    let announce = args.join(" ").slice(22);
    if(!args[1]) return message.channel.send("PLEASE ENTER A MESSAGE YOU WANT TO ANNOUCE**!**");

        let announceEmbed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setDescription(announce)
        .setTimestamp()
        .setFooter("ANNOUNCE | SNOW ❆", bot.user.displayAvatarURL);

        announcechannel.send(announceEmbed);
    }

    // EMBED [OWNER ONLY]
    if(cmd === `${prefix}embed`) {

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
        bot.login(tokenfile.token);
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

    // TWITCH LIVE [OWNER ONLY]
    if(cmd === `${prefix}muylive`) {

    if(message.member =! "297832577782382592") return;
    
    let muyavatar = "https://static-cdn.jtvnw.net/jtv_user_pictures/b95d8ac7-9782-4c9d-ad7a-a5e204f565b9-profile_image-300x300.png";

    message.delete();

    message.channel.send("**❆ // MUYWININDEED** IS **LIVE** ON **TWITCH!**")

    let muyEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setAuthor("MUYWININDEED", muyavatar)
    .setThumbnail(muyavatar)
    .setTitle("MINECRAFT 100%")
    .addField("GAME", "FORTNITE", true)
    .addField("HOST", "TWITCH.TV", true)
    .setURL("https://twitch.tv/muywinindeed/")
    .setImage("https://static-cdn.jtvnw.net/previews-ttv/live_user_muywinindeed-320x180.jpg?r=279571");

    message.channel.send(muyEmbed);

    }

    // CAT COMMAND
    if(cmd === `${prefix}cat`) {

    const { body, header } = await superagent
    .get(`http://aws.random.cat//meow`);
    const catEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setDescription("**CAT ❆**")
    .setImage(body.file);

    message.channel.send(catEmbed);

    }

    // COMMANDS | COMMAND HANDLER
    if(cmd === `${prefix}addrole`) {

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
    // if(!permissions.has("MANAGE_MEMBERS")) return message.channel.send("CANNOT DO THAT **-** MAKE SURE I HAVE THE RIGH PERMISSIONS**!**");
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args [1]);
    // if (rMember == "417210018576990208") return;
    if(!rMember) return message.channel.send("CAN'T FIND USER**!**");
    let role = args.join(" ").slice(22);
    if(!role) return message.channel.send("SPECIFY A ROLE**!**");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.channel.send("CAN'T FIND ROLE**!**");
    // if(rMember.highestRole.position >= message.member.highestRole.position) return message.channel.send("CAN NOT GIVE A ROLE THAT'S HIGHER UP THAN YOURSELF**!**");

    if(rMember.roles.has(gRole.id)) return message.channel.send("THAT USER ALREADY HAVE THAT ROLE**!**");
    await(rMember.addRole(gRole.id)).then(() => {
        message.channel.send(`<@${rMember.id}> WAS ADDED TO THE **${gRole}** ROLE**!**`)

        let addroleEmbed = new Discord.RichEmbed()
        .setTitle("ADD ROLE ❆")
        .setTimestamp()
        .setColor(botconfig.blue)
        .addField("USER", rMember)
        .addField("ROLE", gRole)
        .addField("MODERATOR", message.author)
        .addField("CHANNEL", message.channel)
        .setFooter("SNOW ❆", bot.user.displayAvatarURL);

        let addrolechannel = message.guild.channels.find(`name`, "snow-log");
        if(!addrolechannel) message.guild.createChannel("snow-log"); 

        return addrolechannel.send(addroleEmbed);

    });

    }

    // BAN COMMAND
    if(cmd === `${prefix}ban`) {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
    // if(!permissions.has("BAN_MEMBERS")) return message.channel.send("CANNOT DO THAT **-** MAKE SURE I HAVE THE RIGHT PERMISSIONS**!**");
    if(bUser == message.author.id) return message.channel.send("YOU CAN NOT BAN YOURSELF**!**");
    if(!bUser) return message.channel.send("CAN'T FIND USER**!**");
    let bReason = args.join(" ").slice(22);
    if(bUser == bot.user.id) return;
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("THAT USER CAN'T BE BANNED**!**");
    if(!bReason) return message.channel.send("PLEASE INCLUDE A REASON FOR THE BAN**!**");

    message.guild.member(bUser).ban(bReason);
        message.channel.send(`${bUser} HAS BEEN **BANNED** BY ${message.author} BECAUSE: **${bReason}**`);        
        
    let banstaffembed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setTimestamp()
    .setTitle("BAN ❆")
    .addField("USER", bUser)
    .addField("MODERATOR", message.author)
    .addField("CHANNEL", message.channel)
    .addField("REASON", bReason)
    .setFooter("SNOW ❆", bot.user.displayAvatarURL);

    let snowlog = message.guild.channels.find(`name`, "snow-log");
    if(!snowlog) return;
    
    snowlog.send(banstaffembed);

    }

    // CLEAR - PURGE COMMAND
    if(cmd === `${prefix}clear`) {

    message.delete().catch(O_o=>{});

    const amount = isNaN(args[0]) ? parseInt(args[1]) : parseInt(args[0]);

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
    // if(!permissions.has("MANAGE_MESSAGES")) return message.channel.send("CANNOT DO THAT **-** MAKE SURE I HAVE THE RIGHT PERMISSIONS**!**");
    if (amount < 0) return message.channel.send("CANNOT DELETE A NEGATIVE NUMBER OF MESSAGES**!**")
    if (amount > 100) return message.channel.send("CAN ONLY DELETE 99 MESSAGES MAX**!**")

    if(!args[0]) return message.channel.send("PLEASE ENTER A CERTAIN NUMBER YOU WANT TO DELETE**!**");
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`CLEARED **${args[0]}** MESSAGES**!**`).then(msg => msg.delete(5000));
    });

    }

    // DEAFEN USER FOR A SPECIFIC TIME
    if(cmd === `${prefix}deafen`) {

    let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
    // if(!permissions.has("MANAGE_MEMBERS")) return message.channel.send("CANNOT DO THAT **-** MAKE SURE I HAVE THE RIGHT PERMISSIONS**!**");
    if (!toMute) return message.channel.send("CAN'T FIND USER**!**");
    if(toMute.id === message.author.id) return message.channel.send("YOU CAN'T DEAFEN YOURSELF**!**");
    if(toMute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("THIS USER CAN'T BE DEAFENED**!**");
    if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("CAN NOT MUTE A MEMBER WHO IS IN A HIGHER OR HAS THE SAE ROLE AS YOU**!**");
    let deafenrole = message.guild.roles.find(`name`, `DEAFENED / ❆`);
    if(!deafenrole){
        try{
            deafenrole = await message.guild.createRole({
                name: "DEAFENED / ❆",
                color: "#65798d",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(deafenrole, {
                    SPEAK: false
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    } 

    let mutetime = args[1];
    if(!mutetime) return message.channel.send("SPECIFY A TIME**!**");

    if(toMute.roles.has(deafenrole.id)) return message.channel.send("THIS USER IS ALREADY MUTED**!**");

    await(toMute.addRole(deafenrole));
    message.channel.send(`<@${toMute.id}> HAS BEEN **DEAFENED** FOR **${ms(ms(mutetime))}!**`);

    if(toMute.deafenrole.has(role.id)) return message.channel.send("THIS USER IS ALREADY MUTED**!**");

    let deafenembed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setTitle("DEAFEN ❆")
    .setTimestamp()
    .addField("USER", toMute)
    .addField("MODERATOR", message.author)
    .addField("CHANNEL", message.channel)
    .addField("TIME", `${ms(ms(mutetime))}`)
    .setFooter("SNOW ❆", bot.user.displayAvatarURL);

    let snowlog = message.guild.channels.find(`name`, "snow-log");
    if(!snow) return;

    deafenchannel.send(deafenembed);

    let autoundeafenEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setTitle("UNDEAFEN ❆")
    .setTimestamp()
    .addField("USER", toMute)
    .addField("MODERATOR", "<@417210018576990208>")
    .setFooter("SNOW ❆", bot.user.displayAvatarURL);

    let snowlog2 = message.guild.channels.find(`name`, "snow-log");
    if(!snowlog2) return;

    if(!toMute.roles.has(deafenrole)) return message.channel.send("THIS USER IS NOT DEAFENED**!**");

    setTimeout(function() {
        toMute.removeRole(deafenrole.id);
        if(!toMute.roles.has(deafenrole.id)) return;
        message.channel.send(`<@${toMute.id}> HAS BEEN **UNDEAFENED!**`)
        snowlog2.send(autoundeafenEmbed);
    }, ms(mutetime));
    
    }

    // DOG COMMAND
    if(cmd === `${prefix}dog`) {
    
    let { body } = await superagent
    .get("https://random.dog/woof.json");

    let dogEmbed = new Discord.RichEmbed()
    .setDescription("**:dog:  /  ** DOG **❆**")
    .setColor(botconfig.blue)
    .setImage(body.url);

    message.channel.send(dogEmbed);

    }

    // FORTNITE COMMAND
    if(cmd === `${prefix}fortnite`) {

    //let username = args [0];
    let username = args[0];
    let platform = args[1] || "pc";

    if(!args[0]) return message.channel.send("PLEASE ENTER A FORTNITE USERNAME AND A PLATFORM TO SEE FORTNITE STATS**!**");

    message.channel.send("YOUR FORTNITE STAT IS BEING REQUESTED **...**").then((message) => {

    let data = ft.getInfo(username, platform).then(data => {

        let stats = data.lifetimeStats;
        let kills = stats.find(s => s.stat == 'kills');
        let wins = stats.find(s => s.stat == 'wins');
        let kd = stats.find(s => s.stat == 'kd');
        let mPlayed = stats.find(s => s.stat == 'matchesPlayed');

        let fUser = args.join(" ").slice(2);
        if(!fUser) return message.edit("CAN'T FIND FORTITE USERNAME**!**");

        let fortniteEmbed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setTitle("FORTNITE STATS ❆")
        .addField("**" + data.username + "**", "**/**")
        .addField("KILLS", kills.value)
        .addField("WINS", wins.value)
        .addField("K/D", kd.value)
        .addField("MATCHES PLAYED", mPlayed.value)
        .setFooter("FORTNITE STATS | SNOW ❆", bot.user.displayAvatarURL);

        message.edit(fortniteEmbed).then(msg => msg.delete(40000));

        });

    }).catch(e => {
        message.channel.send("CAN'T FIND USERNAME**!**").then(msg => msg.delete(10000))
    });

    }

    // KICK USER
    if(cmd === `${prefix}kick`) {

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args [0]));
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
    // if(!permissions.has("KICK_MEMBERS")) return message.channel.send("CANNOT DO THAT **-** MAKE SURE I HAVE THE RIGHT PERMISSIONS**!**");
    if(kUser == message.author.id) return message.channel.send("YOU CAN NOT KICK YOURSELF**!**");
    if(!kUser) return message.channel.send("CAN'T FIND USER**!**");
    let kReason = args.join(" ").slice(22);
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("THIS USER CAN'T BE KICKED**!**");
    if(!kReason) return message.channel.send("PLEASE INCLUDE A REASON FOR THE THE KICK**!**");

    message.guild.member(kUser).kick(kReason);
    message.channel.send(`${kUser} HAS BEEN **KICKED** BY ${message.author} BECAUSE: **${kReason}**`);
        
    let kickembed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setTitle("KICK ❆")
    .addField("USER", kUser)
    .addField("MODERATOR", message.author)
    .addField("CHANNEL", message.channel)
    .addField("REASON", kReason)
    .setTimestamp()
    .setFooter("SNOW ❆", bot.user.displayAvatarURL);

    let snowlog = message.guild.channels.find(`name`, "snow-log");
    if(!snow) return;

    kickchannel.send(kickembed);

    }

    // MUTE USER FOR A SPECIFIC TIME
    if(cmd === `${prefix}mute`) {

    let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
    if (!toMute) return message.channel.send("CAN'T FIND USER**!**");
    if(toMute.id === message.author.id) return message.channel.send("YOU CAN'T MUTE YOURSELF**!**");
    if(toMute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("THIS USER CAN'T BE MUTED**!**");
    if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("CAN NOT MUTE A MEMBER WHO IS IN A HIGHER OR HAS THE SAME ROLE AS YOU**!**");
    let muterole = message.guild.roles.find(`name`, `MUTED / ❆`);
    if(!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "MUTED / ❆",
                color: "#65798d",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_RECTIONS: false,
                    SPEAK: false
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    } 

    let mutetime = args[1];
    if(!mutetime) return message.channel.send("SPECIFY A TIME**!**");

    if(toMute.roles.has(muterole)) return message.channel.send("THIS USER IS ALREADY MUTED**!**");

    await(toMute.addRole(muterole));
    message.channel.send(`<@${toMute.id}> HAS BEEN **MUTED** FOR **${ms(ms(mutetime))}!**`);

    let muteembed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setTitle("MUTE ❆")
    .setTimestamp()
    .addField("USER", toMute)
    .addField("MODERATOR", message.author)
    .addField("CHANNEL", message.channel)
    .addField("TIME", `${ms(ms(mutetime))}`)
    .setFooter("SNOW ❆", bot.user.displayAvatarURL);

    let snowlog = message.guild.channels.find(`name`, "snow-log");
    if(!snowlog) return;

    mutechannel.send(muteembed);

    let automuteembed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setTitle("UNMUTE ❆")
    .setTimestamp()
    .addField("USER", toMute)
    .addField("MODERATOR", "<@417210018576990208>")
    .setFooter("SNOW ❆", bot.user.displayAvatarURL);

    let snowlog1 = message.guild.channels.find(`name`, "snow-log");
    if(!snowlog1) return;

    if(!toMute.roles.has(muterole)) return message.channel.send("THIS USER IS NOT MUTED**!**");
    
    setTimeout(function() {
        toMute.removeRole(muterole);
        if(!toMute.roles.has(muterole)) return;
        message.channel.send(`<@${toMute.id}> HAS BEEN **UNMUTED!**`)
        snowlog1.send(automutechannel);
    }, ms(mutetime));
    
    }

    // RANK - LEVEL COMMAND
    if (cmd === `${prefix}rank` || cmd === `${prefix}level`) {

    let rUser = message.mentions.users.first() || message.guild.members.get(args [0]) || message.author;
    let sender = rUser;
    if(!rUser) return message.channel.send("CAN'T FIND USER**!**");
    
    // if (!xp[sender.id + message.guild.id]) xp[sender.id + message.guild.id] = {}

    if(!xp[rUser.id + message.guild.id]){
        xp[rUser.id + message.guild.id] = {
            xp: 0,
            level: 1
        };
    }

    let curxp = xp[rUser.id + message.guild.id].xp;
    let curlvl = xp[rUser.id + message.guild.id].level;
    let nxtlvlxp = curlvl * 600;
    let difference = nxtlvlxp - curxp;
    
    let lvlEmbed = new Discord.RichEmbed()
    .setAuthor(rUser.username)
    .setColor(botconfig.blue)
    .addField("LEVEL", curlvl, true)
    .addField("TOTAL XP", curxp, true)
    .setFooter(difference + "XP UNTIL LEVEL UP! | ❆", rUser.displayAvatarURL);

    return message.channel.send(lvlEmbed);

    }

    // REMINDER COMMAND
    if(cmd === `${prefix}reminder`) {

    let remindertime = args[0];
    if(!remindertime) return message.channel.send("SPECIFY A TIME AND A NOTE**!**");

    let notemessage = args.join(" ");
    if(!args[1]) return message.channel.send("PLEASE ENTER A REMINDER NOTE AS WELL**!**");

    message.channel.send(`A REMINDER HAS BEEN SET FOR **${ms(ms(remindertime))}!**`);

    setTimeout(function() {

        let reminderEmbed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setDescription(`THE **${ms(ms(remindertime))}** HAS BEEN FINISHED IN **${message.guild.name}!**`)
        .addField("REMINDER NOTE", `${notemessage}`)
        .setFooter("SNOW ❆", bot.user.displayAvatarURL);

        message.author.send(reminderEmbed);

    }, ms(remindertime));

    }

    // REMOVE ROLE COMMAND
    if(cmd === `${prefix}removerole`) {

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
    // if(!permissions.has("MANAGE_MEMBERS")) return message.channel.send("CANNOT DO THAT **-** MAKE SURE I HAVE THE RIGH PERMISSIONS**!**");
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args [1]);
    // if (rMember === "417210018576990208") return;
    if(!rMember) return message.channel.send("CAN'T FIND USER**!**");
    let role = args.join(" ").slice(22);
    if(bUser == bot.user.id) return;
    if(!role) return message.channel.send("SPECIFY A ROLE**!**");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) message.channel.send("CAN'T FIND ROLE**!**");
    // if(rMember.highestRole.position >= message.member.highestRole.position) return message.channel.send("CAN NOT GIVE A ROLE THAT'S HIGHER UP THAN YOURSELF**!**");

    if(!rMember.roles.has(gRole.id)) return message.channel.send("THAT THEY ALREADY HAVE THAT ROLE**!**");
    await(rMember.removeRole(gRole.id)).then(() => {
        message.channel.send(`<@${rMember.id}> WAS REMOVED FROM THE **${gRole}** ROLE**!**`);

        let removeroleEmbed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setTitle("REMOVE ROLE ❆")
        .setTimestamp()
        .addField("USER", rMember)
        .addField("ROLE", gRole)
        .addField("MODERATOR", message.author)
        .addField("CHANNEL", message.channel)
        .setFooter("SNOW ❆", bot.user.displayAvatarURL);

        let removerolechannel = message.guild.channels.find(`name`, "snow-log");
        if(!removerolechannel) message.guild.createChannel("snow-log"); 

        removerolechannel.send(removeroleEmbed);
        
    });

    }
    
    // SHORTEN COMMAND
    if(cmd === `${prefix}shorten`) {

    if(!args[0]) return message.channel.send("CAN'T FIND LINK**!**");

    snowgenerating = message.channel.send("GENERATING LINK **...**").then((message) => {

    if(!args[1]) {

        shorten.shorten(args[0], function(snowdone) {
        if (snowdone.startsWith('Error:')) return message.edit("PLEASE ENTER A VALID URL**!**"); 

        message.edit(`**FINISHED!**\n<${snowdone}>`);

    });

    }
});

    }

    // URBAN DICTIONARY COMMAND
    if(cmd === `${prefix}urban`) {

    if(!args[0]) return message.channel.send("PLEASE ENTER AN ARGUMENT TO SEARCH FOR IN THE URBAN DICTIONARY**!**");

    let res = urban(args.join(" ")).catch(e => {
        return message.channel.send("COULDN'T FIND THAT WORD IN THE URBAN DICTIONARY DATABASE**!**");
        return;
    });

    message.channel.send("SEARCHING IN THE URBAN DICTIONARY DATABASE **...**").then(urbanmessage => {

    let urbanEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setTitle("URBAN DICTIONARY ❆")
    .setDescription("**" + res.word + `**\n\n**DEFINITION:**\n${res.definition}`)
    .addField("EXAMPLE", res.example)
    .addField("UPVOTES ⇑", res.thumbsUp)
    .addField("DOWNVOTES ⇓", res.thumbsDown)
    .addField("WRITTEN BY", res.author)
    .setFooter("URBAN DICTIONARY | SNOW ❆", bot.user.displayAvatarURL);

    if (!res.catch) return urbanmessage.edit(urbanEmbed);

});

    } 

    // VOTE COMMMAND
    if(cmd === `${prefix}vote`) {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
    const thumbup = "👍";
    const perhaps = "🤷";
    const thumbdown = "👎";

    const voteMessage = args.join(" ");
    if(!voteMessage) return message.channel.send("PLEASE INDICATE A VOTE MESSAGE AS WELL**!**");

    let voteEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setAuthor("VOTE!")
    .setTitle("**/**")
    .setDescription(`${voteMessage}`)
    .setFooter("VOTE | SNOW ❆", bot.user.displayAvatarURL);

    let msg = await message.channel.send(voteEmbed);
    await msg.react(thumbup);
    await msg.react(thumbdown);
    await msg.react(perhaps);
     //await msg.react(client.emojis.find(`name`, "SNOWPERHAPS"));
    //await msg.react(client.emojis.find(`name`, "SNOWCROSS"));
    }

    // WARN USER
    if(cmd === `${prefix}warn`) {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
    // if(!permissions.has("MANAGE_MESSAGES")) return message.channel.send("CANNOT DO THAT **-** MAKE SURE I HAVE THE RIGHT PERMISSIONS**!**");
    if(!args[0]) return message.channel.send("PLASE ENTER A MEMBER YOU WANT TO WARN**!**");
    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!wUser) return message.channel.send("CAN'T FIND USER**!**");
    if(wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("THAT USER CAN'T BE WARNED**!**");
    let reason = args.join(" ").slice(22);
    if(!reason) return message.channel.send("PLEASE INCLUDE A REASON FOR THE WARN**!**");

    message.channel.send(wUser + " HAS BEEN **WARNED** BECAUSE: **" + reason + "!**");

    let warnembed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setAuthor("WARN ❆")
    .setTimestamp()
    .setDescription("YOU HAVE BEEN WARNED IN " + "**" + message.guild.name + "!**")
    .addField("WARNED BY", `${message.author}`)
    .addField("REASON", reason)
    .setFooter("SNOW ❆", bot.user.displayAvatarURL);

    wUser.send(warnembed);

    let warnstaffembed = new Discord.RichEmbed()
    .setAuthor("WARN ❆")
    .setColor(botconfig.blue)
    .setTimestamp()
    .addField("USER", wUser)
    .addField("MODERATOR", message.author)
    .addField("CHANNEL", message.channel)
    .addField("REASON", reason)
    .setFooter("SNOW ❆", bot.user.displayAvatarURL);

    let snowlog = message.guild.channels.find(`name`, "snow-log");
    if(!snowlog) return;

    warnchannel.send(warnstaffembed);

    }

    // WEATHER COMMAND
    if(cmd === `${prefix}weather`) {

    const makeURL = (city) => `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${encodeURIComponent(city)}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
    const celsius = (fahrenheit) => Math.round(((fahrenheit - 32) * 5) / 9);

    // const weatherEmojiText = {

    //     32: "SUNNY",
    //     31: "CLEAR",
    //     34: "MOSTLY SUNNY",
    //     26: "CLOUDY",
    //     28: "MOSTLY CLOUDY"

    // };

    // const weatherEmoji = {

    //     32: ":sunny:",
    //     31: ":sun_with_face:",
    //     34: ":white_sun_small_cloud:",
    //     26: ":cloud:",
    //     28: ":white_sun_cloud:"

    // };

    if(!args[0]) return message.channel.send("PLEASE ENTER A CITY YOU WANT TO CHECK WEATHER FOR**!**");

    message.channel.send("THE WEATHER IS BEING REQUESTED **...**").then((snow) => {

    const city = args.join(" ");
    const res = got(makeURL(args.join(" ")), { json: true });

    if (!res || !res.body || !res.body.query || !res.body.query.results || !res.body.query.results.channel) {
    return snow.edit("COULDN'T CHECK WEATHER**!**");
    }

    const weatherInfo = res.body.query.results.channel;
    const forecast = weatherInfo.item.forecast[0];

    weather.find({search: args.join(" "), degreeType: "F"}, function(err, result) {


    // if(!city) return message.channel.send("PLEASE ENTER A CITY YOU WANT TO CHECK WEATHER FOR**!**");

    const countryInfo = countries.find(country => country.name === weatherInfo.location.country);
    const countryEmoji = countryInfo ? countryInfo.emoji : "** **";

    //if (err) message.channel.send(err);

    var current = result[0].current;
    var location = result[0].location;

    let weatherEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setAuthor("WEATHER  ☁")
    .setTimestamp()
    .setDescription(`${countryEmoji} **>** ` + "\`" + current.skytext + "\`")
    .addField("TEMPERATURE", `${celsius(current.temperature)}**°C** **/** ${weatherInfo.item.condition.temp}**°F**`, true)
    .addField("FEELS LIKE", `${celsius(current.feelslike)}**°C** **/** ${current.feelslike}**°F**`, true)
    .addField("WINDS", `*${current.winddisplay}*` +  "  **>**  " + `*${weatherInfo.wind.direction}* ` + "**°**", true)
    .addField("HUMIDITY", `${current.humidity}**%**`, true)
    .addField("SUNRISE", `*${weatherInfo.astronomy.sunrise}*`, true)
    .addField("SUNSET", `*${weatherInfo.astronomy.sunset}*`, true)
    .setFooter(`${current.observationpoint} | SNOW ❆`, bot.user.displayAvatarURL);

    snow.edit(weatherEmbed);

});

});

    }

    // SLOT COMMAND
    if(cmd === `${prefix}slot` || cmd === `${prefix}spin`) {

    let slotItems = ["🌳", "🌲", "🍀", "🍃", "🌿"];

    let slotRandom1 = Math.floor((Math.random()) * slotItems.length);
    let slotRandom2 = Math.floor((Math.random()) * slotItems.length);
    let slotRandom3 = Math.floor((Math.random()) * slotItems.length);
    let slotRandom4 = Math.floor((Math.random()) * slotItems.length);
    let slotRandom5 = Math.floor((Math.random()) * slotItems.length);
    let slotRandom6 = Math.floor((Math.random()) * slotItems.length);
    let slotRandom7 = Math.floor((Math.random()) * slotItems.length);
    let slotRandom8 = Math.floor((Math.random()) * slotItems.length);
    let slotRandom9 = Math.floor((Math.random()) * slotItems.length);

    let slotEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setDescription("**" + message.author.username + "**\n" + slotItems[slotRandom1] + " **|** " + slotItems[slotRandom2] + " **|** " + slotItems[slotRandom3] + "\n" + slotItems[slotRandom4] + " **|** " + slotItems[slotRandom5] + " **|** " + slotItems[slotRandom6] + "\n" + slotItems[slotRandom7] + " **|** " + slotItems[slotRandom8] + " **|** " + slotItems[slotRandom9])
    .setFooter("SLOT | SNOW ❆", bot.user.displayAvatarURL);

    return message.channel.send(slotEmbed);

}

    // RANDOM COLOR COMMAND
    if(cmd === `${prefix}randomcolor`) {

    let color = "000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);}).toLocaleLowerCase();

    let randomColorEmbed = new Discord.RichEmbed()
    .setAuthor(`#${color.toUpperCase()}`, `https://dummyimage.com/250/${color}/&text=%20`)
    .setTitle("[INFORMATION]")
    .setColor(`${color}`)
    // .setThumbnail(`https://www.colorhexa.com/${color.slice(1)}.png`)
    .setURL(`https://www.colorhexa.com/${color.slice(1)}`)
    .setDescription(`**RGB**\n${convert.hex.rgb(color)}\n\n**HSL**\n${convert.hex.hsl(color)}\n\n**CSS**\n${convert.hex.keyword(color).toUpperCase()}`)
    .setFooter("RANDOM COLOR | SNOW ❆", bot.user.displayAvatarURL);

    return message.channel.send(randomColorEmbed);

    }

    // SEARCH AFTER A HEX COLOR
    if(cmd === `${prefix}color`) {

    let color = args[0].replace("#", "");

    if(!color) return message.channel.send("COULDN'T FIND COLOR**!**");

    let colorEmbed = new Discord.RichEmbed()
    .setColor(`${color}`)
    .setAuthor(`#${color.toUpperCase()}`, `https://dummyimage.com/250/${color}/&text=%20`)
    .setTitle("[INFORMATION]")
    .setURL(`https://colorhexa.com/${color}`)
    .setDescription(`**RGB**\n${convert.hex.rgb(color)}\n\n**HSL**\n${convert.hex.hsl(color)}\n\n**CSS**\n${convert.hex.keyword(color).toUpperCase()}`)
    .setFooter("COLOR | SNOW ❆", bot.user.displayAvatarURL);

    return message.channel.send(colorEmbed);

    }

    // GIF COMMAND
    if(cmd === `${prefix}gif`) {

    if(!args[0]) return message.channel.send("PLEASE ENTER A GIF SEARCH MESSAGE**!**");

    message.channel.send("LOADING GIF **...**").then(snowgifmessage => {

    const res = got(`http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${encodeURIComponent(args.join(" "))}`, { json: true });

    if(!res || !res.body || !res.body.data) return snowgifmessage.edit("FAILED TO LOAD GIF**!**");

    let gifEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setDescription("GIF **❆**")
    .setImage(res.body.data.image_url);

    if (res.body.data.image_url = snowgifmessage.edit(gifEmbed));

});

    }

    // LMGTYFY COMMAND
    if(cmd === `${prefix}lmgtfy`) {

        let question = encode(args.join(" "));
        if(!question) return message.channel.send("PLEASE ENTER A QUESITON YOU WANT TO MAKE WITH LMGTFY**!**");

        message.channel.send("GENERATING **...**").then(loadingMessage => {

        let link = `https://lmgtfy.com/?q=${question}`;

        return loadingMessage.edit("**FINISHED!**" + "\n" + `<${link}>`);

    });

    }

    if(cmd === `${prefix}youtube`) {

        let search = encode(args.join(" "));
        if(!search) return message.channel.send("PLEASE ENTER A YOUTUBE SEARCH MESSAGE**!**");

        message.channel.send("SEARCHING **...**").then(youtubeMessage => {

        youtubeLink = `https://youtube.com/results?search_query=${search}`;

        return youtubeMessage.edit("**FINISHED!**" + "\n" + `<${youtubeLink}>`);

        });

    }

});

bot.login(process.env.token);
