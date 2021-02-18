const ayarlar = require('../config.json');
const db = require('quick.db');
const Discord = require('discord.js');
module.exports = async (message) => {
const client = message.client;
const prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
if (message.author.bot) return;
if (!message.content.startsWith(prefix)) return;

  
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
    if (!client.commands.has(command)) {
    if (client.aliases.has(command)) {
    } else {
    }
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

};