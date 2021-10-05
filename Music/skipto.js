////////////////////////////
////////CONFIG LOAD/////////
////////////////////////////
const { canModifyQueue } = require("../util/Util");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed");
const { prf } = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "skipto",
  aliases: ["st", "jump"],
  description: "Skip to the selected queue number",
  cooldown: 5,
  edesc: `Type the Command, to skip a specific amount of songs to the wanted song.\nUsage: ${prf}skipto`,

execute(message, args) {
    //if not in a guild return
    if (!message.guild) return;
    //react with approve
    message.react("✅").catch(console.error);
    //if no args return error
    if (!args.length)
      return attentionembed(message, `Try: ${prf}${module.exports.name} <Queue Number>`)
    //if not a number return error
    if (isNaN(args[0]))
      return attentionembed(message, `Try: ${prf}${module.exports.name} <Queue Number>`)
    //get the queue
    const queue = message.client.queue.get(message.guild.id);
    //if no Queue return error
    if (!queue) return attentionembed(message, "There is no Queue");
    //if member not in the same voice channel as the Bot return
    if (!canModifyQueue(message.member)) return;
    //if args bigger then the Server Queue return error
    if (args[0] > queue.songs.length)
      return attentionembed(message, `The Queue is just ${queue.songs.length} long!`);
    //set playing to true
    queue.playing = true;
    //if the queue is loop 
    if (queue.loop) {
      //make a loop for all songs to skip and add them at the end again
      for (let i = 0; i < args[0] - 1; i++) 
        queue.songs.push(queue.songs.shift());
    //if not a loop
    } else {
      //remove all songs including the args 
      queue.songs = queue.songs.slice(args[0] - 1);
    }
    //end current song
    queue.connection.dispatcher.end();
    //Send approve
    queue.textChannel.send(
      new MessageEmbed()
        .setColor("#ffe700")
        .setAuthor(`${message.author.username}#${message.author.discriminator} skipped ${args[0]} songs`,"https://images.emojiterra.com/twitter/v13.0/128px/23ed.png")
    ).catch(console.error);
  }
};
