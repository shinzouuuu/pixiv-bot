const discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: [Intents.FLAGS.GUILDS , Intents.FLAGS.DIRECT_MESSAGES ,Intents.FLAGS.GUILD_MESSAGES], partials: ['MESSAGE', 'CHANNEL'] });

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

const util = require("./utils/util.ts");
const config = require("./config.json");

fs.readdir("./src/commands/", (err, files) => {
  if (err) console.error(err);
  files.forEach((f) => {
    let props = require(`./commands/${f}`);
    props.fileName = f;
    client.commands.set(props.help.name, props);
    console.log(`Loding command ${props.help.name}`);
    props.help.aliases.forEach((alias) => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.on("messageCreate", (message) => {
  try {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content
      .slice(config.prefix.length)
      .trim()
      .split(/ +/g);
    let command = args.shift().toLowerCase();

    if (client.aliases.has(command))
      command = client.commands.get(client.aliases.get(command)).help.name; 
    
    if(!client.commands.get(command)) return message.reply(`${config.prefix}${command} command does not exist!`)
    
    if (client.commands.get(command).info.args == true) {
      if (!args[0])
        return message.reply(`${config.prefix}${command} command requires arguments!`);
    }
    let commandFile = require(`./commands/${command}.ts`);
    commandFile.run(client, message, args, util);
  } catch (err) {
    if (err.message === `Cannot read property 'config' of undefined`) return;
    if (err.code == "MODULE_NOT_FOUND") return;
    console.error(err);
  }
});

client.on("ready", async () => {
  console.log(`${client.user.username} is online!`);
  client.user.setActivity(
    `${config.prefix}help | ${client.guilds.cache.size} servers`,
    { type: "WATCHING" }
  );
});

client.login(config.token);
