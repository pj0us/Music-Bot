////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const { prf } = require(`../config.json`);
const progressbar = require('string-progressbar');
// Returns: Array<String, String>
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "nowplaying",
  aliases: ['np',"now-playing","current","current-song"],
  description: "Show current song",
  cooldown: 5,
  edesc: `Type nowplaying in chat, to see which song is currently playing! As well as how long it will take until its finished\nUsage: ${prf}nowplaying`,
  
execute(message) {
    //if not in a guild return
    if(!message.guild) return;
    //react with approve emoji
    message.react("✅")
    //get Server Queue
    const queue = message.client.queue.get(message.guild.id);
    //if nothing playing error
    if (!queue) return attentionembed(message, "There is nothing playing.").catch(console.error);
    //Define the current song 
    const song = queue.songs[0];
    //get current song duration in s
    const arrtime = song.duration.split(":")
    let ms;
    if(arrtime.length == 3) {
      const hours = arrtime[0]
      const minutes = arrtime[1]
      const seconds = arrtime[2]
      ms = (Number(hours)*3600+Number(minutes)*60+Number(seconds));   
    } else {
      const minutes = arrtime[0]
      const seconds = arrtime[1]
      ms = (Number(minutes)*60+Number(seconds));   
    }
    //get thumbnail
    let thumb;
    if (song.thumbnail === undefined) thumb = "https://cdn.discordapp.com/attachments/748095614017077318/769672148524335114/unknown.png";
    else thumb = song.thumbnail.url;
    //define current time
    const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
    //define left duration
    const left = ms - seek;
    //define embed
    let nowPlaying = new MessageEmbed()
      .setTitle("Now playing")
      .setDescription(`[**${song.title}**](${song.url})`)
      .setThumbnail(song.thumbnail.url)
      .setColor("#ffe700")
      .setFooter("Time Remaining: " + new Date(left * 1000).toISOString().substr(11, 8));
      //if its a stream
      if(ms >= 10000) {
        nowPlaying.addField("\u200b", ":red_circle: LIVE", false);
        //send approve msg
        return message.channel.send(nowPlaying);
      }
      //If its not a stream 
      if (ms > 0 && ms<10000) {
        nowPlaying.addField("\u200b", "**[" + progressbar.splitBar((ms == 0 ? seek : ms), seek, 25, "▬", "⚪️")[0] + "]**\n**" + new Date(seek * 1000).toISOString().substr(11, 8) + " / " + (ms == 0 ? " ◉ LIVE" : new Date(ms * 1000).toISOString().substr(11, 8))+ "**" , false );
        //send approve msg
        return message.channel.send(nowPlaying);
      }
  }
};