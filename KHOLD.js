const express = require('express');
const app = express();
const Discord = require('discord.js');
const client = new Discord.Client()
const fs = require('fs')
const db = require('quick.db')
const moment = require('moment')
const cfg = require('./config.json')



app.get("/foo", (req, res, next) => {
  const foo = JSON.parse(req.body.jsonString);
});
process.on("unhandledRejection", (reason, promise) => {
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./KHOLDKomutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} Komut Yükleniyor...`);
  files.forEach(f => {
    let props = require(`./KHOLDKomutlar/${f}`);
    log(`${props.help.name} adlı komut başarıyla yüklendi!`);
    client.commands.set(props.help.name, props);
 
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
     
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./KHOLDKomutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

  client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./KHOLDKomutlar/${command}`)];
      let cmd = require(`./KHOLDKomutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === cfg.sahip) permlvl = 4;
  return permlvl;
};

client.on("messageUpdate", async (oldMsg, newMsg) => {
  let prefix = await db.fetch(`prefix_${newMsg.guild.id}`) || cfg.prefix
  if (newMsg.author.bot) return;
  if (!newMsg.content.startsWith(prefix)) return;
  let command = newMsg.content.split(' ')[0].slice(prefix.length)
  let params = newMsg.content.split(' ').slice(1)
  let perms = client.elevation(newMsg);
  let cmd;
  if (client.commands.has(command)) cmd = client.commands.get(command);
  else if (client.aliases.has(command)) cmd = client.commands.get(client.aliases.get(command));
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, newMsg, params, perms);
  }
});

client.login(cfg.token).catch(e => console.log(`Bota giriş yaparken başarısız olundu!`));


