import * as Fightcade from 'fightcade-api'
import { MessageAttachment, MessageEmbed } from 'discord.js'
import { readdirSync, readFileSync, accessSync, writeFileSync } from 'fs'

const contentDir = process.env.CONTENT_DIR

//console.log('fightcase.js: Reading FC user data')

// const fcUsersLocation = `${contentDir}/fc_data/${process.env.FCUSERFILE}`
// console.log(`Attempting to read file: ${fcUsersLocation}`)
// import fcJson from fcUsersLocation assert {type: 'json'}
// let fcUsers = JSON.parse(fcJson)
// try {
//   accessSync(fcUsersLocation)
//   const fcUsersRawData = readFileSync(fcUsersLocation)
//   fcUsers = JSON.parse(fcFile)
//   console.log('FC user file read successfully')
// } catch (err) {
//   console.error('There was an issue reading the FC user file')
//   console.error(err.message)
// }

async function getUser(username) {
  try {
    const user = await Fightcade.GetUser(username)
    for (const gameid in user.gameinfo) {
      if (user.gameinfo[gameid].rank) {
        console.log(`${gameid}: ${user.gameinfo[gameid].num_matches}`)
      }
    }
  } catch (error) {
    console.log(e)
  }
}

function register(discordId, discordUsername, fcUsername) {
  console.log(discordId)
  // fcUsers[newUser].DiscordName = discordUsername
  // fcUsers[newUser].FCUsername = fcUsername
  const newUserData = {
    discordId: {
      'DiscordName': discordUsername,
      'FCUsername': fcUsername
    }
  }
  fcUsers.push(newUserData)
  //fcUsers[discordId] = newUser
  console.log(fcUsers[discordId])
  console.log(fcUsers[discordId].DiscordName)
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
    console.log(userId)
    console.log(fcUsers[userId].FCUsername)
    getUser(fcUsers[userId].FCUsername)
  }
}