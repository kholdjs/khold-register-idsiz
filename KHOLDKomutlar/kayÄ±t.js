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
if(!cfg.Roles.erkek) return KHOLDembed(`Erkek rolleri ayarlanmamış, \`Config\` dosyasını kontrol edin!`)
if(!cfg.Roles.unregister) return KHOLDembed(`Kayıtsız rolleri ayarlanmamış, \`Config\` dosyasını kontrol edin!`)
if(!cfg.Tag.tag) return KHOLDembed(`Tag ayarlanmamış, \`Config\` dosyasını kontrol edin!`) 
if(!KHOLD) return KHOLDembed(`Lütfen tüm argümanları doğru yerleştirip tekrar deneyin!\n\nÖrnek: \`.isim @Khold/ID İsim Yaş\``)
let isim = args.slice(1).join(" | ");
//  args[1].charAt(0).replace('i', "İ").toUpperCase() + args[1].slice(1);
  if (!isim) return KHOLDembed(`Lütfen tüm argümanları doğru yerleştirip tekrar deneyin!\n\nÖrnek: \`.isim @Khold/ID İsim Yaş\``)
  KHOLD.setNickname(`${cfg.Tag.tag} ${isim}`)
  kholdb.push(`users.${KHOLD.user.id}.registerLog`, [
    {
      tarih: Date.now(),
      isim: `${isim}`,
      rol: `İsim Değiştirme`
    }    
  ]);
  
  

let timereplace = args[0];
let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat') 
kholdb.add('case', 1)
const omgkhold = await kholdb.fetch('case')
var tarih = new Date(Date.now())
var tarih2 = ms(timereplace)
var tarih3 = Date.now() + tarih2 +10800000
let ay = moment(Date.now()+10800000).format("MM")  
let gün = moment(Date.now()+10800000).format("DD")
let saat = moment(Date.now()+10800000).format("HH:mm:ss")
let yıl = moment(Date.now()+10800000).format("YYYY")
let kayıtsaat = `\`${gün} ${ay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${saat} (${yıl})\``
const embed = new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
.setDescription(`
${KHOLD} adlı üyenin kullanıcı adı başarıyla "${cfg.Tag.tag} ${isim}" olarak ayarlandı!

${cfg.Emoji.kirmizi}Kişinin toplamda ${kholdb.get(`users.${KHOLD.user.id}.registerLog`)? kholdb.get(`users.${KHOLD.user.id}.registerLog`).length : 0} isim kayıtı bulundu;\n
`);
    if (kholdb.get(`users.${KHOLD.user.id}.registerLog`) ? true : false) {
      Object.keys(kholdb.get(`users.${KHOLD.user.id}.registerLog`)).forEach(x => {
        embed.description +=
          "`• " +
          kholdb.get(`users.${KHOLD.user.id}.registerLog`)[x][0].isim +
          "` " +
          `(${kholdb.get(`users.${KHOLD.user.id}.registerLog`)[x][0].rol})\n`;
      });
 embed.description += `
  Kullanıcının daha önceki isimlerine \`.isimler @Khold/ID\` bakarak kayıt işlemini gerçekleştirmeniz önerilir. `
      message.channel.send(embed).then(async mesaj => {
let onayy = await message.channel.awaitMessages((m) => m.author.id == message.author.id && ["erkek", "kadın"].some(cevap => m.content.toLowerCase().includes(cevap)), {max: 1, time: 60000 });

  if(onayy.size === null) return message.channel.send(
      
 new MessageEmbed()
.setColor("BLACK")
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
.setDescription(`${KHOLD} adlı üyenin kayıt işlemi cinsiyet seçimi yapılmadığı için iptal edildi! `))
  let kholdonayerkek = onayy.first();
if (kholdonayerkek.content.toLocaleLowerCase().includes(`${kholdPrefix}erkek`)) {
await KHOLD.roles.add(cfg.Roles.erkek).catch();
await KHOLD.roles.remove(cfg.Roles.unregister).catch();
await KHOLD.roles.remove(cfg.Roles.kadın).catch();
  
    kholdb.push(`users.${KHOLD.user.id}.registerLog`, [
    {
      tarih: Date.now(),
      isim: `${isim}`,
      rol: `<@&${cfg.Roles.erkek[0]}>`
    }
  ]);
  const kholdOnay = new MessageEmbed()
.setColor("BLACK")
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
.setDescription(`${KHOLD} üyesine <@&${cfg.Roles.erkek[0]}> rolü verildi`)
message.channel.send(kholdOnay)  
};
let kholdonaykadın = onayy.first();
if (kholdonaykadın.content.toLocaleLowerCase().includes(`${kholdPrefix}kadın`)) {
await KHOLD.roles.add(cfg.Roles.kadın).catch();
await KHOLD.roles.remove(cfg.Roles.unregister).catch();
await KHOLD.roles.remove(cfg.Roles.erkek).catch();
      kholdb.push(`users.${KHOLD.user.id}.registerLog`, [
    {
      tarih: Date.now(),
      isim: `${isim}`,
      rol: `<@&${cfg.Roles.kadın[0]}>`
    }     
  ]);
const kholdOnay = new MessageEmbed()
.setColor("BLACK")
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
.setDescription(`${KHOLD} üyesine <@&${cfg.Roles.kadın[0]}> rolü verildi.`)
message.channel.send(kholdOnay)
  };
}
                               );  

    };
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