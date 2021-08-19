module.exports = {
    name: 'say',
    description: 'Bot send messages on your behalf but dont delete command you use',
    edesc: "Type !say <your message> and bot will send but bot wont delete your command message",
    execute(message, args, client) {
      if (!message.guild) return;
          // Send message to the same channel
          message.channel.send(args.join(' '), { disableMentions: 'all' }) 
        },
      };