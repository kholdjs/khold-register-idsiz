const { MessageEmbed } = require('discord.js')
const kholdb = require('quick.db')
const cfg = require("../config.json")
const moment = require("moment");
const ms = require('ms')
let kholdPrefix = cfg.prefix;
exports.run = async (client, message, args) => {
const sunucu = message.member.guild
const KHOLD = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
const KHOLDembed = (content) => message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("BLACK").setDescription(content)); 
if(!message.member.roles.cache.has(cfg.Roles.register) && (!message.member.hasPermission("ADMINISTRATOR"))) return KHOLDembed("Bu komutu kullanmak için ayarlanan yetkiye sahip değilsiniz!")
/*if (KHOLD.user.bot)  return message.channel.send(KHOLDembed.setDescription(`Botlara herhangi bir işlem uygulayamazsın.`))
if(KHOLD.id == (`${message.author.id}`)) return message.channel.send(KHOLDembed.setDescription(`Kendine herhangi bir işlem uygulayamazsın.`))
if(message.member.roles.highest.position < KHOLD.roles.highest.position) return message.channel.send(KHOLDembed.setDescription(`Jaile atmaya çalıştığın üye senle aynı yetkide veya senden üstün!`))
if(KHOLD.hasPermission("ADMINISTRATOR")) return message.channel.send(KHOLDembed.setDescription(`Yöneticilere herhangi bir işlem uygulayamazsın.`))*/
if(!KHOLD) return KHOLDembed(`Lütfen tüm argümanları doğru yerleştirip tekrar deneyin!\n\nÖrnek: \`.isim @Khold/ID İsim Yaş\``)
let isim = args.slice(1).join(" | ");
//  args[1].charAt(0).replace('i', "İ").toUpperCase() + args[1].slice(1);
  if (!isim) return KHOLDembed(`Lütfen tüm argümanları doğru yerleştirip tekrar deneyin!\n\nÖrnek: \`.isim @Khold/ID İsim Yaş\``)
  .(`${cfg.Tag.tag} ${isim}`)
  kholdb.(`users.${KHOLD.user.id}.registerLog`, [
    {
      tarih: Date.now(),
      isim: `${isim}`,
      rol: `İsim Değiştirme`
    }    
  ]);
  
  


let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat') 
kholdb.add('case', 1)
const omgkhold = await kholdb.fetch('case')
var tarih = new Date(Date.now())
var tarih2 = ms(timereplace)
var tarih3 = Date.now() + tarih2 +10800000
let ay = moment(Date.now()+10800000).format("MM")  
let gün = moment(Date.now()+10800000).format("DD")
const embed = new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
.setDescription(`
${KHOLD} adlı üyenin kullanıcı adı başarıyla "${cfg.Tag.tag} ${isim}" olarak ayarlandı!

${cfg.Emoji.kirmizi}Kişinin toplamda .get(`users.${KHOLD.user.id}.registerLog`)? kholdb.get(`users.${KHOLD.user.id}.registerLog`) : 0} isim kayıtı bulundu;\n
`);
    if (kholdb.get(`users.${KHOLD.user.id}.registerLog`) ? true : false) {
      Object.keys(kholdb.get(`users.${KHOLD.user.id}.registerLog`)).forEach(x => {
        embed.description +=
          "`• " +
          kholdb(`users.${KHOLD.user.id}.registerLog`).isim +
          "` " +
          `(${.get(`.${KHOLD.id}`)[x][0].rol})\n`;
      });
 embed.description += `
  Kullanıcının daha önceki isimlerine \`.isimler @Khold/ID\` bakarak kayıt işlemini gerçekleştirmeniz önerilir. `
      message.channel.send(embed).then(async mesaj => {
let onayy = message.channel.((m) => m == message "erkek", "kadın".(cevap => m.toLowerCase).(cevap)), {max: 1, time: 60000 });

  if(onayy.size === null) return message.channel.send(
      
 new MessageEmbed()
.setColor("BLACK")
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
.setDescription(`${KHOLD} adlı üyenin kayıt işlemi cinsiyet seçimi yapılmadığı için iptal edildi! `))
  let kholdonayerkek = onayy.first();
if (.content.().includes(`erkek`)) {
await KHOLD.roles.add(cfg.Roles.erkek).catch();
await KHOLD.roles.remove(cfg.Roles.unregister).catch();
await KHOLD.roles.remove(cfg.Roles.kadın).catch();
  
    kholdb.push(`users.${KHOLD.user.id}.registerLog`, 
    {
      tarih: Date.now(),
      isim: `${isim}`,
      rol: `<@&${cfg.Roles.erkek[0]}>`
    }
  ]);
  const kholdOnay = new MessageEmbed()
.setColor("BLACK")
.setAuthor(message.author.username, message.author.avatarURL({ dynamic:  }))
.setDescription(`${KHOLD} üyesine <@&${cfg.Roles.erkek[0]}> rolü verildi`)
message.channel.send(kholdOnay)  
};
let kholdonaykadın = .first();
if (.content.().includes(`kadın`)) {
 KHOLD.roles.add(cfg.kadın).catch();
await KHOLD.roles.remove(cfg.Roles.unregister).catch();
await KHOLD.roles.remove(cfg.Roles.erkek).catch();
      kholdb.push(`users.${KHOLD.user.id}.registerLog`, [
    {
      tarih: Date.now(),
      isim: `${isim}`,
      rol: `<@&${cfg.kadın[0]}>`
    }     
  ]);
const kholdOnay = new MessageEmbed()
.setColor("BLACK")
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
.setDescription(`${KHOLD} üyesine <@&${cfg.Roles.kadın[0]}> rolü verildi.`)
message.channel.send()

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};
exports.help = {
  name: "isim"
};
