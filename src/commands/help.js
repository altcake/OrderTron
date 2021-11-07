import { MessageEmbed } from 'discord.js'
import { readFileSync } from 'fs'

const currentVersion = JSON.parse(readFileSync('./package.json')).version

console.log(`Current OrderTron version: ${currentVersion}`)

export const name = 'help'
export const description = 'help!'
export function execute (message, args) {
  const printHelp = new MessageEmbed()
    .setColor('#ff0000')
    .setTitle(`OrderTron Directives for version ${currentVersion}`)
    .addFields(
      { name: '~enforce', value: 'Use this to lay down the law.', inline: true },
      { name: '~enka', value: 'Recommends some classy music.', inline: true },
      { name: '~training', value: '<NOT FINISHED> Obtain a training manual.' },
      { name: '~XdX or ~dX', value: 'Roll some dice!  This command can also be chained Eg. ~d20 2d10' })
  message.member.send({ embeds: [printHelp] })
}
