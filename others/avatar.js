const MessageEmbed = require('discord.js')
module.exports = {
  name: 'avatar',
  description: "See someone's avatar",
  edesc: "Type !avatar <SomeOne> to see someone's avatar",
  execute(message, args, client, Discord){
    if (!message.guild) return;
    const target = message.mentions.members.first() || message.member
    //send Avatar to the same channel
      const newEmbed = new Discord.MessageEmbed()
      .setColor('#ffe700')
      .setTitle('Download')
      .setAuthor(target.user.tag)
      .setURL(target.user.avatarURL())
      .setImage(target.user.displayAvatarURL())
      .setFooter('id: ' + target.user.id)
      message.channel.send(newEmbed);
  },
};