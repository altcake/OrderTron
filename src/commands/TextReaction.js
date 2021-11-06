import { MessageAttachment } from 'discord.js'
import { readdirSync } from 'fs'

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
const brotherCheck = new MessageAttachment(`${contentDir}/images/brother.jpg`)
const gotDamn = new MessageAttachment(`${contentDir}/images/damn.jpg`)
const slowpoke = new MessageAttachment(`${contentDir}/images/slowpoke.jpg`)
const bottomCheck = new MessageAttachment(`${contentDir}/images/bottom_check.png`)
const bottomCheckSuccess = new MessageAttachment(`${contentDir}/images/bottom_check_success.jpg`)

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
  console.log('Activity from channel: ' + message.channel)
  console.log('Activity from user ID: ' + message.member.id)
  console.log('Activity from user: ' + message.member.displayName)
  console.log('Message received: ' + message.content)

  if (message.channel.guild != serverMap.DOP && ((message.content.toLowerCase().match(/(?:^| )let'?s/) && message.content.toLowerCase().includes(' go')) || message.content.toLowerCase().includes('lfg'))) {
    console.log("LET'S GOOOOOOOO")
    const letsGo = new MessageAttachment(letsGoFiles[Math.floor(Math.random() * letsGoFiles.length)])
    message.channel.send({ files: [letsGo] })
  }
  if (message.channel.guild != serverMap.DOP && message.content.toLowerCase().includes('booba')) {
    console.log('BOOBA')
    const booba = new MessageAttachment(boobaFiles[Math.floor(Math.random() * boobaFiles.length)])
    message.channel.send({ files: [booba] })
  }
  if (message.channel.guild != serverMap.DOP && ((message.content.toLowerCase().includes('spyro') || message.content.toLowerCase().includes('subway')) || (message.content.toLowerCase().match(/(?:^| )eat/) && message.content.toLowerCase().includes('fresh')))) {
    console.log('SPYRO')
    const spyro = new MessageAttachment(spyroFiles[Math.floor(Math.random() * spyroFiles.length)])
    message.channel.send({ files: [spyro] })
  }
  if ((message.content.toLowerCase().match(/^oof/) || message.content.toLowerCase().match(/\s+oof/))) {
    console.log('Big oof')
    message.channel.send({ files: [bigOof] })
  }
  if (message.channel.guild != serverMap.DOP && message.content.toLowerCase().includes('white')) {
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
  if (message.channel.guild == serverMap.OCB && message.content.toLowerCase().includes('suavemente')) {
    console.log('SUAVEMENTE')
    message.channel.send({ files: [suavemente] })
  }
  if (message.channel.guild != serverMap.DOP && message.content.toLowerCase().includes('sexy') && message.content.toLowerCase().includes('back')) {
    console.log('SEXY BACK')
    message.channel.send('```yeah```')
  }
  if (message.channel.guild != serverMap.DOP && (message.content.toLowerCase().includes('stonks'))) {
    console.log('STONKS')
    const stonks = new MessageAttachment(stonksFiles[Math.floor(Math.random() * stonksFiles.length)])
    message.channel.send({ files: [stonks] })
  }
  if (message.channel.guild != serverMap.DOP && message.content.toLowerCase().includes('brother check')) {
    console.log('BROTHER CHECK')
    message.channel.send({ files: [brotherCheck] })
  }
  if (message.channel.guild != serverMap.DOP && message.content.toLowerCase().includes('bottom check')) {
    console.log('BOTTOM CHECK')
    message.channel.send({ files: [bottomCheck] })
    if (bottomCheckCounter < 6) {
      bottomCheckCounter += 1
      setTimeout(() => { bottomCheckCounter = 0 }, 60000)
    } else if (bottomCheckCounter == 6) {
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
  if (message.content.toLowerCase().match(new RegExp(process.env.MATCH))) {
    console.log('Slowpoke incoming')
    // Set message delay between 10 minutes to 60 minutes
    const delay = Math.floor(Math.random() * 3000000) + 600000
    console.log(`Message delay: ${delay / 60000} minutes`)
    setTimeout(() => { message.reply({ files: [slowpoke] }) }, delay)
  }
}
