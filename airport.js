const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const airports = require("../../config/database/airports.json");
const countries = require("../../config/database/countries.json");

const Error = require("../../config/functions/server/error.js");
const DISTANCE = require("../../config/functions/distance.js");
const number = require("../../config/functions/number.js");

module.exports.run = async(bot, message, args) => {
  let airport = args[0];
  if(!airport) return message.channel.send(new Error("Airport not entered."));

  airport = airport.toUpperCase();
  airport = airports.filter(data => data.gps_code === airport);

  let AIRPORTS = [];

  if(args.length == 2) {
    for(i in args) {
      AIRPORTS.push(airports.filter(data => data.gps_code === args[i].toUpperCase())[0]);
      if(AIRPORTS[i] === undefined) AIRPORTS[i] = [];
    }
  }

  if(AIRPORTS.length == 2) {
    args[0] = args[0].substr(0, 4).toUpperCase();
    args[1] = args[1].substr(0, 4).toUpperCase();

    if(!AIRPORTS[0].name && !AIRPORTS[1].name) return message.channel.send(new Error("Airports " + args[0] + " and " + args[1] + " not found."));
    if(!AIRPORTS[0].name) return message.channel.send(new Error("Airport " + args[0] + " not found."));
    if(!AIRPORTS[1].name) return message.channel.send(new Error("Airport " + args[1] + " not found."));

    if(args[0] === args[1]) return message.channel.send(new Error("Airports are the same."))

    let departure = AIRPORTS[0];
    let arrival = AIRPORTS[1];

    let distance = DISTANCE(departure.latitude_deg, departure.longitude_deg, arrival.latitude_deg, arrival.longitude_deg);

    let distanceEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription(departure.name + " (" + (departure.iata_code !== "" ? departure.gps_code + "/" + departure.iata_code : departure.gps_code) + ") " + snow.arrow + "\n" + arrival.name + " (" + (arrival.iata_code !== "" ? arrival.gps_code + "/" + arrival.iata_code : arrival.gps_code) + ")")
    .setFooter("Distance " + number(Math.round(distance * 0.0005399568)) + "nm (" + number((Math.round(distance / 1000) * 10) / 10) + " km)", bot.user.displayAvatarURL);

    return message.channel.send(distanceEmbed);
  }

  if(!airport || airport.length == 0) return message.channel.send(new Error("Airport not found."));

  airport = airport[0];
  let codes = { icao: airport.gps_code || airport, iata: airport.iata_code !== "" ? airport.iata_code : null };

  let airportEmbed = new Discord.RichEmbed()
  .setColor(snow.blue)
  .setTitle(airport.name)
  .setDescription((codes.iata === null ? codes.icao : codes.icao + "/" + codes.iata) + " | Elevation " + airport.elevation_ft + "ft")
  .addField("Location", airport.municipality + ", " + countries[airport.iso_country] || airport.iso_country)
  .addField("Latitude", airport.latitude_deg.toString().split(".")[0] + "." + airport.latitude_deg.toString().split(".")[1].substr(0, 3), true)
  .addField("Longitude", airport.longitude_deg.toString().split(".")[0] + "." + airport.longitude_deg.toString().split(".")[1].substr(0, 3), true)
  .setFooter("SNOW", bot.user.displayAvatarURL);

  message.channel.send(airportEmbed);
}

module.exports.config = {
  name: "airport"
}