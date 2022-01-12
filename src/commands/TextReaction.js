import { MessageAttachment, MessageEmbed } from 'discord.js'
import { readdirSync, readFileSync, writeFile, existsSync } from 'fs'
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

const bigOof = new MessageAttachment(`${contentDir}/images/oof.jpg`)
const white = new MessageAttachment(`${contentDir}/images/white.jpg`)
const suavemente = new MessageAttachment(`${contentDir}/images/suavemente.jpg`)
const whoopsWhite = new MessageAttachment(`${contentDir}/images/whoops_white.jpg`)
const brotherCheck = new MessageAttachment(`${contentDir}/images/SPOILER_brother.jpg`)
const gotDamn = new MessageAttachment(`${contentDir}/images/damn.jpg`)
const slowpoke = new MessageAttachment(`${contentDir}/images/slowpoke.jpg`)
const bottomCheck = new MessageAttachment(`${contentDir}/images/bottom_check.png`)
const bottomCheckSuccess = new MessageAttachment(`${contentDir}/images/bottom_check_success.jpg`)

let bottomCheckCounter = 0

let wordData
const OCBWordData = new Map()
const DOPWordData = new Map()
const TESTWordData = new Map()
const wordDataLocation = '../worddata.json'
try {
  if (existsSync(wordDataLocation)) {
    try {
      const wordRawData = readFileSync(wordDataLocation)
      wordData = JSON.parse(wordRawData)
      console.log('Word data file read successfully:')
      console.log(wordData)
    } catch (err) {
      console.error('There was an issue reading the word data file')
      console.error(err.message)
    }
  }
} catch (err) {
  console.error('Word data config file not found.  Creating a new one')
  const commandStartTime = Date.now()
  const wordDataTemplate = {
    OCB: [{
      WORDONECOUNT: 0,
      WORDONELASTUSED: commandStartTime,
      WORDONELONGEST: 0
    }],
    DOP: [{
      WORDONECOUNT: 0,
      WORDONELASTUSED: commandStartTime,
      WORDONELONGEST: 0
    }],
    TEST: [{
      WORDONECOUNT: 0,
      WORDONELASTUSED: commandStartTime,
      WORDONELONGEST: 0
    }]
  }
  const wordDataString = JSON.stringify(wordDataTemplate)
  OCBWordData.wordOneCount = 0
  OCBWordData.wordOneLastUsed = commandStartTime
  OCBWordData.wordOneLongest = 0
  DOPWordData.wordOneCount = 0
  DOPWordData.wordOneLastUsed = commandStartTime
  DOPWordData.wordOneLongest = 0
  TESTWordData.wordOneCount = 0
  TESTWordData.wordOneLastUsed = commandStartTime
  TESTWordData.wordOneLongest = 0
  try {
    writeFile(wordDataLocation, wordDataString)
  } catch (err) {
    console.error('Issue creating word data json file')
    console.error(err.message)
  }
}

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
    switch (message.channel.guild.id) {
      case serverMap.TEST: timeSinceLastUse = Date.now() - TESTWordData.wordOneLastUsed; TESTWordData.wordOneLastUsed = Date.now(); break
      case serverMap.OCB: timeSinceLastUse = Date.now() - OCBWordData.wordOneLastUsed; OCBWordData.wordOneLastUsed = Date.now(); break
      case serverMap.DOP: timeSinceLastUse = Date.now() - DOPWordData.wordOneLastUsed; DOPWordData.wordOneLastUsed = Date.now(); break
      default: console.log('Unknown server')
    }
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
  // Word one
  let timeSinceLastUse = null
  switch (message.channel.guild.id) {
    case serverMap.TEST: timeSinceLastUse = Date.now() - wordOneLastUsed.TEST; break
    case serverMap.OCB: timeSinceLastUse = Date.now() - wordOneLastUsed.OCB; break
    case serverMap.DOP: timeSinceLastUse = Date.now() - wordOneLastUsed.DOP; break
    default: console.log('Unknown server')
  }
  const timeString = convert.convertToString(timeSinceLastUse)
  const reportEmbed = new MessageEmbed()
    .setColor('#ff0000')
    .setTitle(`Metrics for ${message.channel.guild.name}`)
  const wordOneString = `It has been ${timeString} since someone said ${process.env.WORD1}`
  reportEmbed.addField(process.env.WORD1, wordOneString)
  message.channel.send({ embeds: [reportEmbed] })
}
