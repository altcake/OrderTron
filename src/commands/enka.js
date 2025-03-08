import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName('enka')
  .setDescription('ongakuuuu')

export async function execute(interaction) {
  await interaction.reply('https://www.youtube.com/watch?v=VBZfraSQg0Y')
}