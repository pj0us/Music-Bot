const { canModifyQueue } = require("../util/Util");
const { Client, Collection, MessageEmbed } = require("discord.js");

const { attentionembed } = require("../util/attentionembed"); 
const { prf } = require(`../config.json`);
module.exports = {
  name: "pause",
  description: "Pause the currently playing music",
  cooldown: 5,
  edesc: `Type this command to pause the Song!\nUsage: ${prf}pause`,
  execute(message) {
    //If not in a guild return
    if(!message.guild) return;
    //get the queue
    const queue = message.client.queue.get(message.guild.id);
    //if no queue return error
    if (!queue) return attentionembed(message, "There is nothing playing").catch(console.error);
    //If not in the same channel return
    if (!canModifyQueue(message.member)) return;
    //If its playing
    if (queue.playing) {
      //set playing to false
      queue.playing = false;
      //pause the music
      queue.connection.dispatcher.resume();
      queue.connection.dispatcher.pause();
      queue.connection.dispatcher.resume();
      //define the pause embed
      const pausemebed = new MessageEmbed().setColor("#ffe700")
      .setAuthor(`${message.author.username} paused the music.`,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeokYmfL2G5NLAJbpn8MK7_OWzE81Xy1Q7vC1lgyTsAwSI0gUEWTs_W1v5DMGfMvXyTpA&usqp=CAU")
      //react with approve emoji
      message.react("✅")
      //return message
      return queue.textChannel.send(pausemebed).catch(console.error);
    }
  }
};
