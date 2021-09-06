const { MessageAttachment } = require("discord.js")

module.exports = {
    name: 'enforce',
    description: "Justice will be served!",
    execute(message, args) {
        console.log('ENFORCING NOW')
        const enforceAttachment = new MessageAttachment('https://media.giphy.com/media/O3Towk20Ty704/source.gif')
        message.channel.send({ content: 'LAWWWWWWW!!!!!', files: [enforceAttachment] })
    }
}