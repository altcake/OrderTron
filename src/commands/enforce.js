import { AttachmentBuilder, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('enforce')
  .setDescription('Justice will be served!')

export function execute (message, args) {
  console.log('ENFORCING NOW')
  const enforceAttachment = new AttachmentBuilder('https://media.giphy.com/media/O3Towk20Ty704/source.gif')
  message.channel.send({ content: 'LAWWWWWWW!!!!!', files: [enforceAttachment] })
}
