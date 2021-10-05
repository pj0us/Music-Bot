////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const { canModifyQueue } = require("../util/Util");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { prf } = require(`../config.json`);
const { attentionembed } = require("../util/attentionembed"); 
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = { 
    name: "leave", 
    aliases: ["left"],
    cooldown: 5,
    description: "Leave the current channel", 
    edesc: `Type this Command to leave the channel.\nUsage: ${prf}leave`,

    execute(message) {
        //react emoji
          message.react("✅").catch(console.error);
         const { channel } = message.member.voice; 
         const queue = message.client.queue.get(message.guild.id); 
         if (!channel) return message.reply("You need to join a voice channel first!").catch(console.error); 
         if (!message.guild.me.voice.channel) return message.reply("I am not in a voice channel!").catch(console.error); 
         if (channel.id !== message.guild.me.voice.channel.id) return message.reply("I am not in your voice channel!").catch(console.error); 
         if(queue) { 
             queue.connection.dispatcher.destroy(); 
             channel.leave(); 
             message.client.queue.delete(message.guild.id); 
              //send the approve message    
              message.channel.send(new MessageEmbed()
              .setColor("#ffe700")
              .setAuthor(`I have left the channel. See you again.`))
              .catch(console.error);
             return 
            }
            channel.leave(); 
            
    message.client.queue.delete(message.guild.id);
  }
};
