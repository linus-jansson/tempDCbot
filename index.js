const Discord = require("discord.js");
const fs = require("fs");
const config = require("./auth.json");


const client = new Discord.Client();

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

client.login(config.token);


// This function will get the events
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("message", async message => {


  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.author.bot) return;

  if (message.content.indexOf(config.prefix) !== 0) return;

  // this function gets the commands
  try {
    if (fs.existsSync(`./commands/${command}.js`)) {

      let commandFile = require(`./commands/${command}.js`);

      commandFile.run(client, message, args, command);
    } else {
      message.reply(`+${command} does not exist`)
    }

  } catch (err) {
    message.reply('Something went wrong. Please contact administrator.')
    console.error(err);
  }

});
