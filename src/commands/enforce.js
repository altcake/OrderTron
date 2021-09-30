import { MessageAttachment } from 'discord.js'

export const name = 'enforce'
export const description = 'Justice will be served!'
export function execute (message, args) {
  console.log('ENFORCING NOW')
  const enforceAttachment = new MessageAttachment('https://media.giphy.com/media/O3Towk20Ty704/source.gif')
  message.channel.send({ content: 'LAWWWWWWW!!!!!', files: [enforceAttachment] })
}
