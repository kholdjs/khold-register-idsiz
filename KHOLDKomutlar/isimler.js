const Discord = require("discord.js");
const cfg = require("../config.json");
const kholdb = require("quick.db");
module.exports.run = async (client, message, args) => {
 
  if (
    !message.member.roles.cache.has(cfg.Roles.register) &&
    !message.member.hasPermission("ADMINISTRATOR")
  )
    
    return message.channel.sendEmbed(
      new Discord.MessageEmbed()
        .setDescription(
          `Bu komutu kullanmak için ayarlanan yetkiye sahip değilsiniz!`
        )
        .setColor("#black")
    );

  const KHOLD = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));


  const memberembed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag)
    .setDescription(
      `Lütfen tüm argümanları doğru yerleştiriniz ve tekrar deneyiniz.\n\nÖrnek: \`.isimler @Khold/ID\``
    );
  if (!KHOLD) return message.channel.send(memberembed);



  
    let Kholdembed = new Discord.MessageEmbed()
    
      .setDescription(
        `${cfg.Emoji.kirmizi} Bu üyenin toplamda \`${
          kholdb.get(`users.${KHOLD.id}.registerLog`)
            ? kholdb.get(`users.${KHOLD.id}.registerLog`).length
            : 0
        }\` isim kayıtı bulundu;\n\n`
      );
   

    if (kholdb.get(`users.${KHOLD.id}.registerLog`) ? true : false) {
      Object.keys(kholdb.get(`users.${KHOLD.id}.registerLog`)).forEach(x => {
        Kholdembed.description +=
          "`• " +
          kholdb.get(`users.${KHOLD.id}.registerLog`)[x][0].isim +
          "` " +
          `(${kholdb.get(`users.${KHOLD.id}.registerLog`)[x][0].rol})\n`;
      })
      
  
  };
  
  if(kholdb.get(`users.${KHOLD.id}.registerLog`) ? false : true){
    Kholdembed.description += `${cfg.Emoji.kirmizi} Bu kullanıcı hakkında veri tabanında bilgi bulunamadı!`;
  }
  
  message.channel.send(Kholdembed);  
};
exports.conf = {
  enabled: true,
  guildOnly: true, // napıyon laaa
  aliases: ["geçmiş","isimler"],
  permLevel: 0
};

exports.help = {
  name: "isimler",
  description: "Kadın kullanıcıları kayıt etme komutu.",
  usage: "kadın @kişi isim yaş"
};
