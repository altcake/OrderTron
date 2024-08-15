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
      { name: '~#d# or ~d#', value: '[Only in DnD servers]\nRoll some dice! This command can also be chained Eg. ~d20 2d10' },
      { name: '~report', value: 'Display some server word usage stats' },
      { name: 'Image Merge Commands', value: 'Create a new image by attaching one with your command' },
      { name: '~brmerge', value: 'Wow, you nasty' },
      { name: '~ggmerge', value: 'Starring Eddie from Guilty Gear' },
      { name: '~ggbmmerge', value: 'Starring May and Bridget from Guilty Gear' },
      { name: '~mjmerge', value: 'Starring people whose names start with M and J' },
      { name: '~buckmerge', value: 'Wow, you nasty (FromSoft Edition)' },
      { name: 'Fightcade Commands', value: 'Ways to interact with the Fightcade API (Requires initial setup)' },
      { name: '~fightcade register <fightcade_username>', value: 'Input your Fightcade user ID before executing other commands. Only needs to be done the first time you use the Fightcade functions' })
  message.member.send({ embeds: [printHelp] })
}
