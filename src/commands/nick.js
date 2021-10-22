import { MessageEmbed } from 'discord.js'

export const name = 'nick'
export const description = 'working script for the working class'
export function execute (message, args) {
  const printHelp = new MessageEmbed()
    .setColor('#ff0000')
    .setTitle('☭ Welcome to the Red Zone ☭')
    .addFields(
      { name: 'NOTICE', value: 'The following message is brought to you by union labor.', inline: true })
  message.channel.send({ embeds: [printHelp] })
  message.channel.send('https://www.vox.com/policy-and-politics/2017/10/11/16458142/congress-alzheimers-pharmacist')
}
