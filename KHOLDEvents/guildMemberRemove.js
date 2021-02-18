const cfg = require("../config.json");
  const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const db = require('quick.db')

module.exports = async(member) => {

if(member.roles.cache.has(cfg.Roles.unregister)) return;
db.push((`users.${member.id}.registerLog`) + member.id,  `\`${member.displayName}\` (Sunucudan Ayrılma)\n`)
db.add((`users.${member.id}.registerLog`)+member.id, 1)
  
}
module.exports.configuration = {
  name: "guildMemberRemove"
};