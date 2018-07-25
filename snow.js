const Discord = require("discord.js");
const snow = require("./snow.json");

const fs = require("fs");
const got = require("got");
const math = require("math-expression-evaluator");
const stripIndents = require("common-tags").stripIndents;
const encode = require("strict-uri-encode");

const bot = new Discord.Client();
const token = "NDE3MjEwMDE4NTc2OTkwMjA4.DjpxOg.GEdtcCanZFpL2nKDHsJX-c-Vlqc";
bot.commands = new Discord.Collection();

fs.readdir("./snowcommands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) {

        console.log("[!] THERE ARE NO JS FILES IN THE SNOWCOMMANDS FOLDER!");

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

    } else if(bot.guilds.size === "0") {

        snowservers = "SERVERS!";

    }

    console.log(`SNOW IS BACK ON ${bot.guilds.size} ${snowservers}`);

    bot.user.setStatus("ONLINE");
    bot.user.setActivity("SNOW | s!");

});

bot.on("guildMemberAdd", joinmember => {

    let guildmemberaddEmbed = new Discord.RichEmbed()
    .setDescription(`**${joinmember}** HAS JOINED **${joinmember.guild.name}!**`)
    .setFooter(`[⇑] ${joinmember.guild.memberCount} MEMBERS`);

    let snowlog = joinmember.guild.channels.find(`name`, "snow");
    if(!snowlog) return;

    snowlog.send(guildmemberaddEmbed);

});


bot.on("guildMemberRemove", leavemember => {

    let guildmemberremoveEmbed = new Discord.RichEmbed()
    .setDescription(`**${leavemember.username}** HAS LEFT **${leavemember.guild.name}!**`)
    .setFooter(`[⇓] ${leavemember.guild.memberCount} MEMBERS!`);

    let snowlog = leavemember.guild.channels.find(`name`, "snow");
    if(!snowlog) return;

    snowlog.send(guildmemberremoveEmbed);

}); 

bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();
    let args = messageArray.slice(1);
    
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

    if(cmd === `${prefix}restart`) {

        if(message.author.id !== "297832577782382592") return;

        message.channel.send("RESTARTING **...**");
        console.log("[//] RESTARTING ...");

        bot.destroy();

        setTimeout(function () {

            bot.login(token);
            console.log("[!] RESTARTED");

        }, 5000);

    }

    if(cmd === `${prefix}shutdown`) {

        if(message.author.id !== "297832577782382592") return;

        message.channel.send("SHUTTING DOWN **...**");
        console.log("[//] SHUTTING DOWN ...");

        bot.destroy();
        console.log("[!] SHUTTED DOWN");

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
        .setDescription("CALCULATOR **❆**")
        .addField("EQUATION", "```" + equation + "```")
        .addField("ANSWER", "```" + answer + "```")
        .setFooter("CALCULATOR | SNOW ❆", bot.user.displayAvatarURL);

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
        .setDescription("RANDOM IMAGE **❆**")
        .setImage(randomimagelink);

        message.channel.send(randomimageEmbed);

    }

    if(cmd === `${prefix}slot` || cmd === `${prefix}spin`) {

        let slotitems = ["🌳", "🌲", "🍀", "🍃", "🌿"];

        let slotrandom = Math.floor((Math.random()) * slotitems.length);

        let slotrandom1 = slotrandom;
        let slotrandom2 = slotrandom;
        let slotrandom3 = slotrandom;
        let slotrandom4 = slotrandom;
        let slotrandom5 = slotrandom;
        let slotrandom6 = slotrandom;
        let slotrandom7 = slotrandom;
        let slotrandom8 = slotrandom;
        let slotrandom9 = slotrandom;

        let slotEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription(slotItems[slotrandom1] + " **|** " + slotItems[slotrandom2]  + " **|** " + slotItems[slotrandom3] + "\n" + slotItems[slotrandom4] + " **|** " + slotItems[slotrandom5]  + " **|** " + slotItems[slotrandom6] + "\n" + slotItems[slotrandom7] + " **|** " + slotItems[slotrandom8]  + " **|** " + slotItems[slotrandom9])
        .setFooter(`SLOT | SNOW ❆ // ${message.author.username}`, bot.user.displayAvatarURL);

        message.channel.send(slotEmbed);

    }

    if(cmd === `${prefix}duckduckgo` || cmd === `${prefix}ddg`) {

        let ddg = encode(args.join(" "));
        if(!ddg) return message.channel.send("PLEASE ENTER A SEARCH QUERY**!**");

        let ddgLink = `https://duckduckgo.com/?q=${ddg}`;

        message.channel.send("SEARCHING **...**").then((ddgMessage) => {

            ddgMessage.edit("**FINISHED!**\n" + `<${ddgLink}>`);
            
        });

    }

});

bot.login(token);
