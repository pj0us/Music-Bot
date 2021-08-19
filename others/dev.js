const MessageEmbed = require('discord.js')
module.exports = {
  name: 'developer',
  aliases: ['dev'],
  description: "Info of developer",
  edesc: "Info About Developer",
  execute(message, args, client, Discord){
    if (!message.guild) return;
    //send info about developer to the same channel
      const newEmbed = new Discord.MessageEmbed()
      .setColor('#ffe700')
      .setTitle(`Info About ${client.user.username}`)
      .setAuthor(message.guild.name,message.guild.iconURL())
      .addField('Info about developer','Developer of this bot: Pious#2712 \n Nationality:  :flag_vn:\n Id user: 523037941908635688')
      .setThumbnail('https://cdn.discordapp.com/avatars/523037941908635688/a_cc382aae376ab74a3769c6a68f03a4a7.webp')
      .setTimestamp()
      .setFooter(`Requested by: ${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
      message.channel.send(newEmbed);
  },
};