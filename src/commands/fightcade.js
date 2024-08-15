import { Fightcade } from 'fightcade-api'
import { MessageAttachment, MessageEmbed } from 'discord.js'
import { readdirSync, readFileSync, accessSync, writeFileSync } from 'fs'

const contentDir = process.env.CONTENT_DIR

let fcUsers = {}
const fcUsersLocation = `${contentDir}/fc_data/${process.env.FCUSERFILE}`
console.log(`Attempting to read file: ${fcUsersLocation}`)
try {
  accessSync(fcUsersLocation)
  const fcUsersRaw = readFileSync(fcUsersLocation)
  fcUsers = JSON.parse(fcUsersRaw)
  console.log('FC user data read successfully')
} catch (err) {
  console.error('There was an issue reading the FC user data')
  console.error(err.message)
}

async function getUser(username, message) {
  try {
    const user = await Fightcade.GetUser(username)
    const fcInfo = new MessageEmbed()
      .setColor('#ff0000')
      .setTitle(`Fightcade match data for ${username}`)
    for (const gamestring in user.gameinfo) {
      if (user.gameinfo[gamestring].rank) {
        const game = await Fightcade.GetGame(gamestring)
        console.log(`${gamestring}: ${user.gameinfo[gamestring].num_matches}`)
        fcInfo.addFields({name: game.name, value: `Rank: ${user.gameinfo[gamestring].rank}\nNumber of matches: ${user.gameinfo[gamestring].num_matches.toString()}\nTime Played: ${user.gameinfo[gamestring].time_played}` })
      }
    }
    message.channel.send({ embeds: [fcInfo] })
  } catch (error) {
    console.log(error)
    message.channel.send('Something went wrong!')
  }
}

function register(discordId, discordUsername, fcUsername) {
  console.log(discordId)
  fcUsers[discordId] = {'DiscordName': discordUsername, 'FCUsername': fcUsername}
  console.log(fcUsers.discordId)
  try {
    writeFileSync(fcUsersLocation, JSON.stringify(fcUsers))
    console.log('FC user file written successfully')
  } catch (err) {
    console.error('There was an issue reading the FC user file')
    console.error(err.message)
  }
}

export const name = 'fightcade'
export const description = 'Climb the tower in old games'
export function execute (message, args) {
  if (args[0] == 'register') {
    console.log(`Registering new user:\nID = ${message.author.id}\nDiscord Username = ${message.author.username}\nFC Username = ${args[1]}`)
    register(message.author.id, message.author.username, args[1])
  }
  else {
    let userId = message.author.id.toString()
    console.log(`Searching for: ${userId}`)
    console.log(fcUsers[userId].FCUsername)
    getUser(fcUsers[userId].FCUsername, message)
  }
}