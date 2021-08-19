////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const { MessageEmbed, splitMessage, escapeMarkdown, User } = require("discord.js");
const { Client, Collection } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const { prf } = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "queue",
  aliases: ["qu","q"],
  description: "Show the music queue and now playing.",
  cooldown: 7.5,
  edesc: `Type this command to play some music.\nUsage: ${prf}queue`,
  execute(message, client) {
    //if not in a guild return
    if(!message.guild) return;
    //get serverqueue
    const queue = message.client.queue.get(message.guild.id);
    //if no queue aka nothing playing error
    if (!queue) return attentionembed(message, "There is nothing playing.").catch(console.error);
    //set description
    console.log(queue.songs);
    let description = "";
    for(let i = 0; i < queue.songs.length; i++){
      description += `**${i}.** [${queue.songs[i].title.substring(0,40)}](${queue.songs[i].url}) | \`${queue.songs[i].duration}\` | requested by: \`${queue.songs[i].request}\`\n`
    }
    //define queueembed
    let queueEmbed = new MessageEmbed()
      .setTitle("Music Queue")
      .setDescription(description)
      .setColor("#ffe700");
    //split the description
    const splitDescription = splitMessage(description, {
      maxLength: 2048,
      char: "\n",
      prepend: "",
      append: ""
    });
    //For every description send a new embed
    splitDescription.forEach(async (m) => {
      //(over)write embed description
      queueEmbed.setDescription(m);
      //react with emoji
      message.react("✅")
      //send embed
      message.channel.send(queueEmbed);
    });
  }
};
