import { MessageAttachment, MessageEmbed } from 'discord.js'
import { readdirSync, readFileSync, accessSync, writeFileSync, appendFileSync } from 'fs'
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
const brotherCheckSuccess = new MessageAttachment(`${contentDir}/images/SPOILER_brother_reward.jpg`)
const gotDamn = new MessageAttachment(`${contentDir}/images/damn.jpg`)
const slowpoke = new MessageAttachment(`${contentDir}/images/slowpoke.jpg`)
const bottomCheck = new MessageAttachment(`${contentDir}/images/bottom_check.png`)
const bottomCheckSuccess = new MessageAttachment(`${contentDir}/images/bottom_check_success.jpg`)
const badmanCheck = new MessageAttachment(`${contentDir}/images/badman_check.png`)
const chaosCheck = new MessageAttachment(`${contentDir}/images/chaos_check.jpg`)
const reboCheck = new MessageAttachment(`${contentDir}/images/rebo_check.jpg`)
const spyCheck =  new MessageAttachment(`${contentDir}/images/spy_check.png`)
const spyCheckSuccess =  new MessageAttachment(`${contentDir}/images/SPOILER_spy_reward.jpg`)
const beansCheck = new MessageAttachment(`${contentDir}/images/beans_check.png`)
const ravenCheck = new MessageAttachment(`${contentDir}/images/raven_check.jpg`)
const sisterCheck = new MessageAttachment(`${contentDir}/images/SPOILER_sister_check.jpg`)
const sisterCheckSuccess = new MessageAttachment(`${contentDir}/images/sister_check_reward.jpg`)
const johnCheck = new MessageAttachment(`${contentDir}/images/john_check.png`)
const happyImage = new MessageAttachment(`${contentDir}/images/happy.jpg`)


const johnPhrase = `${process.env.MATCH2} check`
const happyPhrase = `${process.env.MATCH3}`

let bottomCheckCounter = 0
let brotherCheckCounter = 0
let spyCheckCounter = 0
let sisterCheckCounter = 0

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

const brownFileList = readdirSync(`${contentDir}/media/brown/`).filter(file => file.endsWith('.mp4'))
const brownLinkFile = `${contentDir}/media/brown/brown_links.txt`
let brownLinks = []
try {
  const data = readFileSync(brownLinkFile, 'UTF-8')
  brownLinks = data.split(/\r?\n/)
  brownLinks.forEach((line) => {
      console.log(line)
  })
} catch (err) {
  console.error(err)
}
for (const file of brownFileList) {
  console.log(`${contentDir}/media/brown/${file}`)
  brownLinks.push(`${contentDir}/media/brown/${file}`)
}

function selectMode (mode) {
  switch (mode) {
    case 'brown': return {file:brownLinkFile, object:brownLinks}
    default: return {file:brownLinkFile, object:brownLinks}
  }
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

  if ((message.content.toLowerCase().match(/(?:^| )let('|’)?s.* go/)) || message.content.toLowerCase().includes('lfg')) {
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
    console.log(`Generated number: ${number}`)
    switch (true) {
      case (number < 0.05): message.channel.send({ files: [whoopsWhite] }); break
      case (number < 0.15): message.channel.send('https://tenor.com/view/rat-white-funny-kys-ikes-kids-gif-24925206'); break
      case (number < 0.4): message.channel.send({ files: [white] }); break
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
    brotherCheckCounter += 1
    message.channel.send({ files: [brotherCheck] })
    if (brotherCheckCounter < 6) {
      console.log(`Counter value: ${brotherCheckCounter}`)
      setTimeout(() => { brotherCheckCounter = 0 }, 1800000)
    } else if (brotherCheckCounter >= 6) {
      console.log('SUFFICIENT BROTHER SUPPORT HAS BEEN REACHED')
      message.channel.send({ files: [brotherCheckSuccess] })
      bottomCheckCounter = 0
    }
  }
  if (message.channel.guild.id !== serverMap.DOP && message.content.toLowerCase().includes('spy check')) {
    console.log('SPY CHECK')
    spyCheckCounter += 1
    message.channel.send({ files: [spyCheck] })
    if (spyCheckCounter < 6) {
      console.log(`Counter value: ${spyCheckCounter}`)
      setTimeout(() => { spyCheckCounter = 0 }, 1800000)
    } else if (spyCheckCounter >= 6) {
      console.log('SUFFICIENT SPY SUPPORT HAS BEEN REACHED')
      message.channel.send({ files: [spyCheckSuccess] })
      spyCheckCounter = 0
    }
  }
  if (message.channel.guild.id !== serverMap.DOP && message.content.toLowerCase().includes('bottom check')) {
    console.log('BOTTOM CHECK')
    bottomCheckCounter += 1
    message.channel.send({ files: [bottomCheck] })
    if (bottomCheckCounter < 6) {
      console.log(`Counter value: ${bottomCheckCounter}`)
      setTimeout(() => { bottomCheckCounter = 0 }, 1800000)
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
  if (message.channel.guild.id !== serverMap.DOP && message.content.toLowerCase().includes('rebo check')) {
    console.log('REBO CHECK')
    message.channel.send({ files: [reboCheck] })
  }
  if (message.channel.guild.id !== serverMap.DOP && message.content.toLowerCase().includes('beans check')) {
    console.log('BEANS CHECK')
    message.channel.send({ files: [beansCheck] })
  }
  if (message.channel.guild.id !== serverMap.DOP && message.content.toLowerCase().includes('raven check')) {
    console.log('RAVEN CHECK')
    message.channel.send({ files: [ravenCheck] })
  }
  if (message.channel.guild.id !== serverMap.DOP && message.content.toLowerCase().includes('sister check')) {
    console.log('SISTER CHECK')
    message.channel.send({ files: [sisterCheck] })
    sisterCheckCounter += 1
    if (sisterCheckCounter < 6) {
      console.log(`Counter value: ${sisterCheckCounter}`)
      setTimeout(() => { sisterCheckCounter = 0 }, 1800000)
    } else if (sisterCheckCounter >= 6) {
      console.log('SUFFICIENT SISTER SUPPORT HAS BEEN REACHED')
      message.channel.send({ files: [sisterCheckSuccess] })
      sisterCheckCounter = 0
    }
  }
  if (message.channel.guild.id !== serverMap.DOP && message.content.toLowerCase().match(johnPhrase)) {
    console.log('JOHN CHECK')
    message.channel.send({ files: [johnCheck] })
  }
  if (message.channel.guild.id !== serverMap.DOP && message.content.toLowerCase().match(happyPhrase)) {
    console.log('HAPPY CHECK')
    message.channel.send({ files: [happyImage] })
  }

  if ((message.content.toLowerCase().includes('got') || message.content.toLowerCase().includes('god')) && message.content.toLowerCase().includes('damn')) {
    console.log('GOT DAMN')
    const number = Math.random()
    if (number < 0.4) {
      message.channel.send({ files: [gotDamn] })
    }
  }
  if (message.channel.guild.id !== serverMap.DOP && (message.content.toLowerCase().match(/i'?m gonna brown/))) {
    console.log("I'M GONNA BROWN")
    message.channel.send('https://www.youtube.com/shorts/Kn-sfB5OSKg')
  } else if (message.channel.guild.id !== serverMap.DOP && (message.content.toLowerCase().includes('brown'))) {
    console.log('BROWN')
    const brownObject = brownLinks[Math.floor(Math.random() * brownLinks.length)]
    if (brownObject.toLowerCase().match(/^http/)) {
      message.channel.send(brownObject)
    } else {
      message.channel.send({ files: [brownObject] })
    }
  }
  if (message.content.toLowerCase().match(new RegExp(process.env.MATCH1)) && !(message.content.toLowerCase().includes('cumbia')) && !(message.content.toLowerCase().includes('cumberbatch'))) {
    let timeSinceLastUse = null
    console.log(`Test server: ${message.channel.guild.id}`)
    console.log(`Stored test server: ${serverMap.TEST}`)
    const serverId = message.channel.guild.id
    console.log(`Word last used: ${wordData[serverId].WORDONELASTUSED}`)
    timeSinceLastUse = Date.now() - wordData[serverId].WORDONELASTUSED
    // Weekly reward series
    // Set new timed reactions in order from longest to shortest
    switch (true) {
      // If time is greater than 35 days, send special message
      case (timeSinceLastUse >= 3024000000): message.channel.send('35 DAYS????????'); message.channel.send('https://www.youtube.com/watch?v=tG35R8F2j8k'); break
      // If time is greater than 2 weeks, send special message
      case (timeSinceLastUse >= 1209600000): message.channel.send('Two weeks?  Seriously?'); message.channel.send('https://www.youtube.com/watch?v=Mcfk3KFhIZg'); break
      // If time is greater than 1 week, send special message
      case (timeSinceLastUse >= 604800000): message.channel.send('Wow, going a whole week.  Such restraint.'); message.channel.send('https://www.youtube.com/watch?v=fC_q9KPczAg'); break
    }
    
    // Daily reward series
    // Set new timed reactions in order from longest to shortest
    switch (true) {
      // If time is greater than 10,000 hours (~416.66 days), send special message
      case (timeSinceLastUse >= 36000000000): message.channel.send('https://www.youtube.com/watch?v=lxZPNXRT2fQ'); break
      // If time is greater than 52 days, send special message
      case (timeSinceLastUse >= 4492800000): message.channel.send('https://www.youtube.com/watch?v=XVxO6fKtrw4'); break
      // If time is greater than 31 days, send special message
      case (timeSinceLastUse >= 2678400000): message.channel.send('https://www.youtube.com/watch?v=rcTIq5mtRRM'); break
      // If time is greater than 28 days, send special message
      case (timeSinceLastUse >= 2419200000): message.channel.send('https://www.youtube.com/watch?v=DbwlGv9SWfY'); break
      // If time is greater than 22 days, send special message
      case (timeSinceLastUse >= 1900800000): message.channel.send('https://www.youtube.com/watch?v=AgFeZr5ptV8'); break
      // If time is greater than 18 days, send special message
      case (timeSinceLastUse >= 1555200000): message.channel.send('https://www.youtube.com/watch?v=1ncpxEmxAh8'); break
      // If time is greater than 16 days, send special message
      case (timeSinceLastUse >= 1382400000): message.channel.send('https://www.youtube.com/watch?v=7dtptXFjjB0'); break
      // If time is greater than 13 days, send special message
      case (timeSinceLastUse >= 1123200000): message.channel.send('https://www.youtube.com/watch?v=vBPTP2rCzag'); break
      // If time is greater than 11 days, send special message
      case (timeSinceLastUse >= 950400000): message.channel.send('https://www.youtube.com/watch?v=ViYANtHJfss'); break
      // If time is greater than 9 days, send special message
      case (timeSinceLastUse >= 777600000): message.channel.send('https://www.youtube.com/watch?v=ZIANBamMgas'); break
      // If time is greater than 8 days, send special message
      case (timeSinceLastUse >= 691200000): message.channel.send('https://www.youtube.com/watch?v=kle2xHhRHg4'); break
      // If time is greater than 6 days, send special message
      case (timeSinceLastUse >= 518400000): message.channel.send('https://www.youtube.com/watch?v=eY-eyZuW_Uk'); break
      // If time is greater than 5 days, send special message
      case (timeSinceLastUse >= 432000000): message.channel.send('https://www.youtube.com/watch?v=5WO5jZ0Uzds'); break
      // If time is greater than 3 days, send special message
      case (timeSinceLastUse >= 259200000): message.channel.send('https://www.youtube.com/watch?v=d8ekz_CSBVg'); break
      // If time is greater than 1 day, send special message
      case (timeSinceLastUse >= 86400000): message.channel.send('https://www.youtube.com/watch?v=gJxjt_JgtYU'); break
      // If time is greater than 16 hours, send special message
      case (timeSinceLastUse >= 57600000): message.channel.send('https://www.youtube.com/watch?v=QrFagM58ang'); break
      // If time is greater than 5 hours, send special message
      case (timeSinceLastUse >= 18000000): message.channel.send('https://www.youtube.com/watch?v=K_yBUfMGvzc'); break
      // If time is greater than 4 hours, send special message
      case (timeSinceLastUse >= 14400000): message.channel.send('https://www.youtube.com/watch?v=-zKOhVSERS8'); break
      // If time is greater than 2 hours, send special message
      case (timeSinceLastUse >= 7200000): message.channel.send('https://www.youtube.com/watch?v=E9mnzzvNjKs'); break
      // If time is greater than 1 hour, send special message
      case (timeSinceLastUse >= 3600000): message.channel.send('https://www.youtube.com/watch?v=wtbzHpz2SCg'); break
      // If time is greater than 20 minutes, send special message
      case (timeSinceLastUse >= 1200000): message.channel.send('https://www.youtube.com/watch?v=bnFa4Mq5PAM'); break
      // If time is greater than 5 minutes, send special message
      case (timeSinceLastUse >= 300000): message.channel.send('https://www.youtube.com/watch?v=sqM3APrfijU'); break
      // If time is greater than 45 seconds, send special message
      case (timeSinceLastUse >= 45000): message.channel.send('https://www.youtube.com/watch?v=kt0g4dWxEBo'); break
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
    // Set message delay between 30 minutes to 360 minutes
    const delay = Math.floor(Math.random() * 19800000) + 1800000
    console.log(`Message delay: ${delay / 60000} minutes`)
    setTimeout(() => { message.reply({ files: [slowpoke] }) }, delay)
  }
}

export function report (message) {
  console.log(`Report requested for ${message.channel.guild.name}`)
  const serverId = message.channel.guild.id
  // Word one
  const currentTime = Date.now()
  const timeSinceLastUse = currentTime - wordData[serverId].WORDONELASTUSED
  const longestTime = wordData[serverId].WORDONELONGEST
  const lastUsedString = convert.convertToString(timeSinceLastUse)
  const longestTimeString = convert.convertToString(longestTime)
  const timesUsed = wordData[serverId].WORDONECOUNT
  const averageTime = (currentTime - process.env.WORD1STARTDATE) / timesUsed
  const averageTimeString = convert.convertToString(averageTime)
  const reportEmbed = new MessageEmbed()
    .setColor('#ff0000')
    .setTitle(`Metrics for ${message.channel.guild.name}`)
  let wordOneString = `It has been ${lastUsedString} since someone said ${process.env.WORD1}`
  wordOneString += `\nThe record for not saying ${process.env.WORD1} is ${longestTimeString}`
  wordOneString += `\n${process.env.WORD1} has been said ${timesUsed} times`
  wordOneString += `\nThe average time between uses of ${process.env.WORD1} is ${averageTimeString}`
  reportEmbed.addFields({ name: process.env.WORD1, value: wordOneString })
  message.channel.send({ embeds: [reportEmbed] })
}

export function addLink(message, args, mode) {
  const objectsToUpdate = selectMode(mode)
  console.log(objectsToUpdate.file)
  console.log(objectsToUpdate.object)
  let duplicateFound = false
  for (const link of brownLinks) {
    if (link == [args[0]]) {
      console.log(`Duplicate entry found: ${link} VS ${args[0]}`)
      duplicateFound = true
    }
  }
  if (args[0].toLowerCase().match(/^http/) && !duplicateFound) {
    try {
      appendFileSync(objectsToUpdate.file, `\n${args[0]}`, 'UTF-8')
      objectsToUpdate.object.push(args[0])
      message.channel.send('Link successfully added!')
    } catch (err) {
      console.error(err)
    }
  } else if (duplicateFound) {
    message.channel.send('This link is already in the list.  HIJO DE PUTA')
  } else {
    console.log('Link is not valid')
    message.channel.send(`${args[0]} is not a valid link.`)
  }
}