import { AttachmentBuilder, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('enforce')
  .setDescription('Justice will be served!')

export async function execute (interaction) {
  console.log('ENFORCING NOW')
  const enforceAttachment = new AttachmentBuilder('https://media.giphy.com/media/O3Towk20Ty704/source.gif')
  await interaction.reply({ content: 'LAWWWWWWW!!!!!', files: [enforceAttachment] })
}
