const MessageEmbed = require('discord.js')
module.exports = {
    name: "invite",
    aliases: ["add"],
    description: "Invite the Bot to your Server",
    edesc: "Invite command",
    execute(message, args, client, Discord){
        const newEmbed = new Discord.MessageEmbed()
            .setColor("#ffe700")
            .setTitle("Invite Pie Music")
            .setURL(`https://discord.com/oauth2/authorize?client_id=864821086490066974&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.gg%2FNg5wfGPUbw&response_type=code&scope=bot%20applications.commands%20guilds%20identify%20email`)
            .setTimestamp()

            message.channel.send(newEmbed);
    }
}
