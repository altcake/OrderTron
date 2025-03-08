import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('nick')
  .setDescription('working script for the working class')

export async function execute (interaction) {
  const printHelp = new EmbedBuilder()
    .setColor('#ff0000')
    .setTitle('☭ Welcome to the Red Zone ☭')
    .addFields(
      { name: 'NOTICE', value: 'The following message is brought to you by union labor.', inline: true })
  await interaction.reply({ embeds: [printHelp] })
  await interaction.followUp('https://www.vox.com/policy-and-politics/2017/10/11/16458142/congress-alzheimers-pharmacist')
}
