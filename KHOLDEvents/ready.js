const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const cfg = require('../config.json');

module.exports = async (client) => {
  
await client.user.setActivity(cfg.Durum, { type: 'WATCHING' }).catch(console.error);
  
await console.log(`[${client.user.tag}]: Giriş Yaptım ve Komutlarım Yüklendi.`);
};