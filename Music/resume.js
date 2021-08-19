////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const { canModifyQueue } = require("../util/MilratoUtil");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const { prf } = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "Resume currently playing music",
  cooldown: 5,
  edesc: `Type this command to resume the paused Song!\nUsage: ${prf}resume`,
  
execute(message) {
    //if not a guild return
    if(!message.guild) return;
    //react with approve emoji
    message.react("✅").catch(console.error);
    //get the Server Queue
    const queue = message.client.queue.get(message.guild.id);
    //if no queue return error
    if (!queue) return attentionembed(message,"There is nothing playing!").catch(console.error);
    //if user not in the same channel as the bot retunr
    if (!canModifyQueue(message.member)) return;
    //if its paused
    if (!queue.playing) {
      //set it to true
      queue.playing = true;
      //resume the Bot
      queue.connection.dispatcher.resume();
      queue.connection.dispatcher.pause();
      queue.connection.dispatcher.resume();
      //Create approve embed
      const playembed = new MessageEmbed().setColor("#ffe700")
      .setAuthor(`${message.author.username} resumed the music!`,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeokYmfL2G5NLAJbpn8MK7_OWzE81Xy1Q7vC1lgyTsAwSI0gUEWTs_W1v5DMGfMvXyTpA&usqp=CAU")
      //send the approve
      return queue.textChannel.send(playembed).catch(console.error);
    }
    //if its not paused return error
    return  attentionembed(message, "The Queue is not paused!").catch(console.error);
  }
};
