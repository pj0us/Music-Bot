module.exports = {
    name: 'sayd',
    description: 'Bot send messages on your behalf and delete command you use',
    edesc: "Type !sayd <your message> and bot will send that message then delete your command message",
    execute(message, args, client) {
      if (!message.guild) return;
          // Send message to the same channel
          message.delete()
          message.channel.send(args.join(' '), { disableMentions: 'all' }) 
        },
      };