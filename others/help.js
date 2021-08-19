const { Client, Collection, MessageEmbed } = require(`discord.js`);
const { prf } = require(`../config.json`);
module.exports = {
  name: `help`,
  description: `Gives you a list of all help Commands`,
  aliases: ["h","commands"],
  cooldown: 3,
  edesc: "Type help to get a short preview of all Commands, Type help <COMMANDNAME> to get extended information about this one command!",
  execute(message,args,client) {
     
    let commands = message.client.commands.array();
 
    let helpEmbed = new MessageEmbed()
      .setTitle("Pie Music Help")
      .setDescription(`**Version:** \`v1.0\` \n**DEFAULT PREFIX:** \`${prf}\``)
      .setFooter( client.user.username +` Type: ${prf}help <Command>  for more information!`, "https://cdn.discordapp.com/avatars/864821086490066974/e81bc4cb914d928bf639ac7734268d9e.webp")
      .setColor("#ffe700");

      let ifargstruedothis = -1;
      
      switch(args[0]){
          case "filter":
           ifargstruedothis=0
          break;
          case "leave":
           ifargstruedothis=1
          break;
          case "loop":
            ifargstruedothis=2
          break;
          case "lyrics":
            ifargstruedothis=3
          break;
          case "nowplaying":
            ifargstruedothis=4
          break;
          case "pause":
            ifargstruedothis=5
          break;
          case "play":
            ifargstruedothis=6
          break;
          case "queue":
            ifargstruedothis=7
          break;
          case "radio":
            ifargstruedothis=8
          break;
          case "remove":
            ifargstruedothis=9
          break;
          case "resume":
            ifargstruedothis=10
          break;
          case "search":
            ifargstruedothis=11
          break;
          case "shuffle":
            ifargstruedothis=12
          break;
          case "skip":
            ifargstruedothis=13
          break;
          case "skipto":
            ifargstruedothis=14
          break;
          case "stop":
            ifargstruedothis=15
          break;
          case "volume":
            ifargstruedothis=16
          break;
          case "avatar":
            ifargstruedothis=17
          break;
          case "developer":
            ifargstruedothis=18
          break;
          case "help":
            ifargstruedothis=19
          break;
          case "invite":
            ifargstruedothis=20
          break;
          case "sayd":
            ifargstruedothis=21
          break;
          case "say":
            ifargstruedothis=22
          case "setprefix":
            ifargstruedothis=23
          break;
          default:        
            commands.forEach((cmd) => {
              helpEmbed.addField(
                `**${cmd.name}**`,
                `${cmd.description}`,
                true
              );
            });
          if(!message.guild) {
            if(!args[0]) {message.react("✅");return message.author.send(helpEmbed);}
            return
            }
            message.react("✅");
            message.author.send(helpEmbed)
            message.channel.send( new MessageEmbed().setColor("#ffe700")
            .setDescription(`**👍 ${message.author} Check your \`direct messages\` for a list of Commands!**`)
            );
           
        break;
       }
     
       if(ifargstruedothis>=0){
         let aliases = commands[ifargstruedothis].aliases;
         if(aliases === undefined || !aliases) aliases="No Aliases!";
         let cooldown = commands[ifargstruedothis].cooldown;
         if(cooldown === undefined || !cooldown) cooldown="No Cooldown!";


        helpEmbed.addField(
          `**${commands[ifargstruedothis].name}**`,
          `\`\`\`fix\n${commands[ifargstruedothis].edesc}\n\`\`\`\n\`${commands[ifargstruedothis].description}\``
        );
        helpEmbed.addField(
          `**:notes: Aliases:**`,
          `\`${aliases}\``
        );
        helpEmbed.addField(
          `**:wrench: Cooldown:**`,
          `\`${cooldown}\``
        );
        if(!message.guild) return message.author.send(helpEmbed);
          message.author.send(helpEmbed)
          message.channel.send( new MessageEmbed().setColor("#ffe700")
          .setDescription(`**👍 ${message.author} Check your \`direct messages\` for a list of Commands!**`)
          );
       }

}
} 
