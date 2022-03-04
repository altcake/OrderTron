import { MessageAttachment, MessageEmbed } from 'discord.js'
import { readdirSync, readFileSync, accessSync, writeFileSync } from 'fs'
import * as convert from '../lib/DateConvert.js'

console.log('TextReaction.js: Setting serverMap')
const serverMap = new Map()
serverMap.DOP = process.env.SERVER_DOP
serverMap.OCB = process.env.SERVER_OCB
serverMap.TEST = process.env.SERVER_TEST

console.log('TextReaction.js: Setting userMap')
const userMap = new Map()
userMap.ar1 = process.env.USER_AR1
userMap.an1 = process.env.USER_AN1
userMap.jo1 = process.env.USER_JO1
userMap.ju1 = process.env.USER_JU1

const contentDir = process.env.CONTENT_DIR

let wordData
const wordDataLocation = `${contentDir}/word_data/${process.env.WORDDATANAME}`
console.log(`Attempting to read file: ${wordDataLocation}`)
try {
  accessSync(wordDataLocation)
  const wordRawData = readFileSync(wordDataLocation)
  wordData = JSON.parse(wordRawData)
  console.log('Word data file read successfully')
} catch (err) {
  console.error('There was an issue reading the word data file')
  console.error(err.message)
}

const bigOof = new MessageAttachment(`${contentDir}/images/oof.jpg`)
const white = new MessageAttachment(`${contentDir}/images/white.jpg`)
const suavemente = new MessageAttachment(`${contentDir}/images/suavemente.jpg`)
const whoopsWhite = new MessageAttachment(`${contentDir}/images/whoops_white.jpg`)
const brotherCheck = new MessageAttachment(`${contentDir}/images/SPOILER_brother.jpg`)
const gotDamn = new MessageAttachment(`${contentDir}/images/damn.jpg`)
const slowpoke = new MessageAttachment(`${contentDir}/images/slowpoke.jpg`)
const bottomCheck = new MessageAttachment(`${contentDir}/images/bottom_check.png`)
const bottomCheckSuccess = new MessageAttachment(`${contentDir}/images/bottom_check_success.jpg`)
const badmanCheck = new MessageAttachment(`${contentDir}/images/badman_check.png`)
const chaosCheck = new MessageAttachment(`${contentDir}/images/chaos_check.jpg`)

let bottomCheckCounter = 0

const letsGoList = readdirSync(`${contentDir}/images/lets_go/`)
const letsGoFiles = []
for (const file of letsGoList) {
  letsGoFiles.push(`${contentDir}/images/lets_go/${file}`)
}

const boobaList = readdirSync(`${contentDir}/images/booba/`)
const boobaFiles = []
for (const file of boobaList) {
  boobaFiles.push(`${contentDir}/images/booba/${file}`)
}

const spyroList = readdirSync(`${contentDir}/images/spyro/`)
const spyroFiles = []
for (const file of spyroList) {
  spyroFiles.push(`${contentDir}/images/spyro/${file}`)
}

const stonksList = readdirSync(`${contentDir}/images/stonks/`)
const stonksFiles = []
for (const file of stonksList) {
  stonksFiles.push(`${contentDir}/images/stonks/${file}`)
}

export const name = 'TextReact'
export const description = 'Eye for an eye.'
export function execute (message) {
  // Find ID of the server
  console.log('Activity from guild: ' + message.channel.guild.name)
  console.log('Activity from channel: ' + message.channel.name)
  console.log('Activity from user ID: ' + message.member.id)
  console.log('Activity from user: ' + message.member.displayName)
  console.log('Message received: ' + message.content)

  if ((message.content.toLowerCase().match(/(?:^| )let'?s/) && message.content.toLowerCase().includes(' go')) || message.content.toLowerCase().includes('lfg')) {
    console.log("LET'S GOOOOOOOO")
    const letsGo = new MessageAttachment(letsGoFiles[Math.floor(Math.random() * letsGoFiles.length)])
    message.channel.send({ files: [letsGo] })
  }
  if (message.channel.guild.id !== serverMap.DOP && message.content.toLowerCase().includes('booba')) {
    console.log('BOOBA')
    const booba = new MessageAttachment(boobaFiles[Math.floor(Math.random() * boobaFiles.length)])
    message.channel.send({ files: [booba] })
  }
  if (message.channel.guild.id !== serverMap.DOP && ((message.content.toLowerCase().includes('spyro') || message.content.toLowerCase().includes('subway')) || (message.content.toLowerCase().match(/(?:^| )eat/) && message.content.toLowerCase().includes('fresh')))) {
    console.log('SPYRO')
    const spyro = new MessageAttachment(spyroFiles[Math.floor(Math.random() * spyroFiles.length)])
    message.channel.send({ files: [spyro] })
  }
  if ((message.content.toLowerCase().match(/^oof/) || message.content.toLowerCase().match(/\s+oof/))) {
    console.log('Big oof')
    message.channel.send({ files: [bigOof] })
  }
  if (message.channel.guild.id !== serverMap.DOP && message.content.toLowerCase().includes('white')) {
    console.log('Making the color')
    const number = Math.random()
    if (number < 0.3) {
      if (number < 0.1) {
        message.channel.send({ files: [whoopsWhite] })
      } else {
        message.channel.send({ files: [white] })
      }
    }
  }
  if (message.channel.guild.id === serverMap.OCB && message.content.toLowerCase().includes('suavemente')) {
    console.log('SUAVEMENTE')
    message.channel.send({ files: [suavemente] })
  }
  if (message.channel.guild.id !== serverMap.DOP && message.content.toLowerCase().includes('sexy') && message.content.toLowerCase().includes('back')) {
    console.log('SEXY BACK')
    message.channel.send('```yeah```')
  }
  if (message.channel.guild.id !== serverMap.DOP && (message.content.toLowerCase().includes('stonks'))) {
    console.log('STONKS')
    const stonks = new MessageAttachment(stonksFiles[Math.floor(Math.random() * stonksFiles.length)])
    message.channel.send({ files: [stonks] })
  }
  if (message.channel.guild.id !== serverMap.DOP && message.content.toLowerCase().includes('brother check')) {
    console.log('BROTHER CHECK')
    message.channel.send({ files: [brotherCheck] })
  }
  if (message.channel.guild.id !== serverMap.DOP && message.content.toLowerCase().includes('bottom check')) {
    console.log('BOTTOM CHECK')
    bottomCheckCounter += 1
    message.channel.send({ files: [bottomCheck] })
    if (bottomCheckCounter < 6) {
      console.log(`Counter value: ${bottomCheckCounter}`)
      setTimeout(() => { bottomCheckCounter = 0 }, 600000)
    } else if (bottomCheckCounter >= 6) {
      console.log('SUFFICIENT BOTTOM SUPPORT HAS BEEN REACHED')
      message.channel.send({ files: [bottomCheckSuccess] })
      bottomCheckCounter = 0
    }
  }
  if (message.channel.guild.id !== serverMap.DOP && message.content.toLowerCase().includes('badman check')) {
    console.log('BADMAN CHECK')
    message.channel.send({ files: [badmanCheck] })
  }
  if (message.channel.guild.id !== serverMap.DOP && message.content.toLowerCase().includes('chaos check')) {
    console.log('CHAOS CHECK')
    message.channel.send({ files: [chaosCheck] })
  }
  if ((message.content.toLowerCase().includes('got') || message.content.toLowerCase().includes('god')) && message.content.toLowerCase().includes('damn')) {
    console.log('GOT DAMN')
    const number = Math.random()
    if (number < 0.4) {
      message.channel.send({ files: [gotDamn] })
    }
  }
  if (message.content.toLowerCase().match(new RegExp(process.env.MATCH1))) {
    let timeSinceLastUse = null
    console.log(`Test server: ${message.channel.guild.id}`)
    console.log(`Stored test server: ${serverMap.TEST}`)
    const serverId = message.channel.guild.id
    console.log(`Word last used: ${wordData[serverId].WORDONELASTUSED}`)
    timeSinceLastUse = Date.now() - wordData[serverId].WORDONELASTUSED
    // If time is greater than 1 week, send special message
    if (timeSinceLastUse >= 604800000) {
      message.channel.send('Wow, such restraint')
      message.channel.send('https://www.youtube.com/watch?v=fC_q9KPczAg')
    }
    // If time is greater than current longest time, set current time to longest time
    if (timeSinceLastUse > wordData[serverId].WORDONELONGEST) {
      wordData[serverId].WORDONELONGEST = timeSinceLastUse
      message.channel.send('https://www.youtube.com/watch?v=S53fZTbKHG0')
    }
    wordData[serverId].WORDONELASTUSED = Date.now()
    wordData[serverId].WORDONECOUNT += 1
    writeFileSync(wordDataLocation, JSON.stringify(wordData))
    const timeString = convert.convertToString(timeSinceLastUse)
    message.channel.send(`It has been ${timeString} since someone said ${process.env.WORD1}`)
    console.log('Slowpoke incoming')
    // Set message delay between 10 minutes to 60 minutes
    const delay = Math.floor(Math.random() * 3000000) + 600000
    console.log(`Message delay: ${delay / 60000} minutes`)
    setTimeout(() => { message.reply({ files: [slowpoke] }) }, delay)
  }
}

export function report (message) {
  console.log(`Report requested for ${message.channel.guild.name}`)
  const serverId = message.channel.guild.id
  // Word one
  const timeSinceLastUse = Date.now() - wordData[serverId].WORDONELASTUSED
  const longestTime = wordData[serverId].WORDONELONGEST
  const lastUsedString = convert.convertToString(timeSinceLastUse)
  const longestTimeString = convert.convertToString(longestTime)
  const timesUsed = wordData[serverId].WORDONECOUNT
  const reportEmbed = new MessageEmbed()
    .setColor('#ff0000')
    .setTitle(`Metrics for ${message.channel.guild.name}`)
  let wordOneString = `It has been ${lastUsedString} since someone said ${process.env.WORD1}`
  wordOneString += `\nThe record for not saying ${process.env.WORD1} is ${longestTimeString}`
  wordOneString += `\n${process.env.WORD1} has been said ${timesUsed} times`
  reportEmbed.addField(process.env.WORD1, wordOneString)
  message.channel.send({ embeds: [reportEmbed] })
}
