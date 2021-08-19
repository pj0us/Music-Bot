const db = require('quick.db');
const Discord = require(`discord.js`);
const MessageEmbed = require('discord.js')
module.exports = {
  name: 'setprefix',
  cooldown: 5,
  description: "Set new prefix for server",
  edesc: "Type !setprefix <newprefix> to change prefix",
  execute(message, args, client, Discord, db) {
  if(!message.member.hasPermission('ADMINISTRATOR')) {
     return message.reply("`You must have ADMINISTRATOR permisson to change prefix!`")
  }
  if(!args[0]) {
    return message.channel.send("Please give the prefix that you want to set")
    }
  if(args[0].length > 3) {
    return message.channel.send("You can not send prefix more than 3 characters")
    }
  if(!message.guild) return;
    let pre = args[0]
    if(!pre) {
      message.channel.send("You will have to specify the prefix next to cmd.")
    }
    else {
      db.set(`prefix_${message.guild.id}`, pre)

      message.channel.send(`Your new prefix is ${pre}`)
    }  
  },
};