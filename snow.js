const Discord = require("discord.js");
const { version: discordVersion } = require("discord.js"); 
const snow = require("./snow.json");

const fs = require("fs");
const got = require("got");
const math = require("math-expression-evaluator");
const stripIndents = require("common-tags").stripIndent;
const encode = require("strict-uri-encode");

const moment = require("moment");
require("moment-duration-format");

const bot = new Discord.Client();
const token = process.env.token;
bot.commands = new Discord.Collection();

fs.readdir("./snowcommands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) {

        console.log("THERE ARE NO JS FILES IN THE SNOWCOMMANDS FOLDER!");

    }

    jsfile.forEach((f, i) => {

        let props = require(`./snowcommands/${f}`);
        console.log(`${f} loaded`);
        bot.commands.set(props.help.name, props);

    });

});

bot.on("ready", async () => {

    let snowservers = "SERVERS!";

    if(bot.guilds.size === "1") {

        snowservers = "SERVER!";

    } else {

        snowservers = "SERVERS!";

    }

    console.log(`SNOW IS BACK ONLINE ON ${bot.guilds.size} ${snowservers}`);

    bot.user.setStatus("ONLINE");
    bot.user.setGame("SNOW | s!", "https://twitch.tv/WIZZ_SNOW");

});

bot.on("guildMemberAdd", joinmember => {

    let guildmemberaddEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription(`${joinmember} HAS JOINED **${joinmember.guild.name}!**`)
    .setFooter(`[⇑] ${joinmember.guild.memberCount} MEMBERS`);

    let snowlog = joinmember.guild.channels.find(`name`, "snow");
    if(!snowlog) return;
    
    snowlog.send(guildmemberaddEmbed);

});

bot.on("guildMemberRemove", leavemember => {

    let guildmemberremoveEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription(`**${leavemember.user.username}**#${leavemember.user.discriminator} HAS LEFT **${leavemember.guild.name}!**`)
    .setFooter(`[⇓] ${leavemember.guild.memberCount} MEMBERS`);

    let snowlog = leavemember.guild.channels.find(`name`, "snow");
    if(!snowlog) return;

    snowlog.send(guildmemberremoveEmbed);

});

bot.on("message", async message => {

    if(message.author.id === bot.user.id) return;
    if(message.channel.type === "dm") return;

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();
    let args = messageArray.slice(1);

    if(!cmd.includes(prefix)) return;

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

    // OWNER COMMANDS

    if(cmd === `${prefix}snowembed`) {

        if(message.author.id !== "297832577782382592") return;

        message.delete();

        let embedMessage = args.join(" ");

        let snowEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription(embedMessage);
        
        message.channel.send(snowEmbed);

    }

    if(cmd === `${prefix}snowsay`) {

        if(message.author.id !== "297832577782382592") return;
        
        message.delete();

        let snowsayMessage = args.join(" ");
        if(!snowsayMessage) return;

        message.channel.send(snowsayMessage);

    }
    
    if(cmd === `${prefix}snowsend`) {
     
        if(message.author.id !== "297832577782382592") return;
        
        message.delete();
        
        let sUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!sUser) return;
        
        let sendmessage = args.slice(1).join(" ");
        if(!sendmessage) return;
        
        let snowsendEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription(sendmessage);
        
        sUser.send(snowsendEmbed);
            
    }   

    if(cmd === `${prefix}restart`) {

        if(message.author.id !== "297832577782382592") return;

        message.channel.send("RESTARTING **...**").then(restartMessage => restartMessage.delete(5000));
        console.log("[//] RESTARTING ...");

        bot.destroy();

        setTimeout(function () {

            bot.login(token);
            console.log("[!] RESTARTED");

        }, 5000);

    }

    if(cmd === `${prefix}shutdown`) {

        if(message.author.id !== "297832577782382592") return;

        await message.channel.send("SHUTTING DOWN **...** SEE YA**!**");
        await console.log("[!] SHUTTED DOWN");

        await process.exit();

    }

    // NON FS COMMANDS

    if(cmd === `${prefix}calculate` || cmd === `${prefix}calculator`) {

        let equation = args.join(" ");
        if(!equation) return message.channel.send("PLEASE PROVIDE AN EQUATION IF YOU WANT TO CALCULATE**!**");

        let answer = math.eval(equation);

        try {

        } catch (err) {

            return message.channel.send("INVALID MATH EQUATION**!**");

        }

        let calculateEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("CALCULATOR **" + snow.snowflake + "**")
        .addField("EQUATION", "```" + equation + "```")
        .addField("ANSWER", "```" + answer + "```")
        .setFooter("CALCULATOR | SNOW " + snow.snowflake, bot.user.displayAvatarURL);

        message.channel.send(calculateEmbed);

    }

    if(cmd === `${prefix}flipcoin` || cmd === `${prefix}coin`) {

        let coin = ["HEADS", "TAILS"];
        let coinrandom = Math.floor((Math.random()) * coin.length);

        message.channel.send(`**${message.author.username},** I FLIPPED **${coin[coinrandom]}!**`);

    }

    if(cmd === `${prefix}randomimage` || cmd === `${prefix}randompicture`) {

        let randomimage = Math.floor(((Math.random()) * 1050) + 1);
        let randomimagelink = `https://picsum.photos/1920/1080/?image=${randomimage}`;

        let randomimageEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("RANDOM IMAGE **" + snow.snowflake + "**")
        .setImage(randomimagelink);

        message.channel.send(randomimageEmbed);

    }

    if(cmd === `${prefix}duckduckgo` || cmd === `${prefix}ddg`) {

        let ddg = encode(args.join(" "));
        if(!ddg) return message.channel.send("PLEASE ENTER A SEARCH QUERY**!**");

        let ddgLink = `https://duckduckgo.com/?q=${ddg}`;

        message.channel.send("SEARCHING **...**").then((ddgMessage) => {

            ddgMessage.edit("**FINISHED!**\n" + `<${ddgLink}>`);

        });

    }

    if(cmd === `${prefix}vote`) {

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");

        const thumbsup = "👍";
        const perhaps = "🤷";
        const thumbsdown = "👎";

        let vote = args.join(" ");
        if(!vote) return message.channel.send("PLEASE ENTER A VOTE MESSAGE**!**");

        let voteEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("VOTE **" + snow.snowflake + "\n//**\n" + vote)
        .setFooter("VOTE | SNOW " + snow.snowflake, bot.user.displayAvatarURL);

        let voteMessage = await message.channel.send(voteEmbed);
        await voteMessage.react(thumbsup);
        await voteMessage.react(thumbsdown);
        await voteMessage.react(perhaps);

    }

    if(cmd === `${prefix}snow` || cmd === `${prefix}`) {

        let uptime = moment.duration(bot.uptime).format(" D [DAY**S**], H [HOUR**S**], m [MINUTE**S**], s [SECOND**S**]");
        let memoryusage = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} \`MB\``;

        let snowEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("SNOW **" + snow.snowflake + "**")
        .addField("BOT NAME", "**" + snow.name + "**#" + bot.user.discriminator + " **(** " + bot.user.id + " **)**")
        .addField("DEVELOPER", "**" + snow.dev + "**#7897")
        .addField("PREFIX // VERSION", "`s!` **// " + snow.version + "**", true)
        .addField("DISCORD VERSION", "`v" + discordVersion + "`", true)
        .addField("NODE.JS VERSION", "`" + process.version + "`", true)
        .addField("MEMORY", memoryusage)
        .addField("UPTIME", uptime)
        .addField("WEBSITE", "https://discordsnowbot.weebly.com/")
        .addField("STATS", `**${bot.guilds.size}** SERVERS\n**${bot.channels.size}** CHANNELS\n**${bot.users.size}** USERS`)
        .setFooter("SNOW " + snow.snowflake, bot.user.displayAvatarURL);

        message.channel.send(snowEmbed);

    }

});

bot.login(token);

// WIZZ
