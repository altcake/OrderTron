import { Fightcade } from 'fightcade-api'
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { readFileSync, accessSync, writeFileSync } from 'fs'

const contentDir = process.env.CONTENT_DIR

let fcUsers = {}
const fcUsersLocation = `${contentDir}/fc_data/${process.env.FCUSERFILE}`
console.log(`Attempting to read file: ${fcUsersLocation}`)
try {
  accessSync(fcUsersLocation)
  const fcUsersRaw = readFileSync(fcUsersLocation, 'utf-8')
  fcUsers = JSON.parse(fcUsersRaw)
  console.log('FC user data read successfully')
} catch (err) {
  console.error('There was an issue reading the FC user data')
  console.error(err.message)
}

async function getUser(message, username) {
  try {
    console.log(`Getting Fightcade data for ${username}`)
    const user = await Fightcade.GetUser(username)
    console.log(user.gameinfo)
    let fcInfo = new EmbedBuilder()
      .setColor('#ff0000')
      .setTitle(`Fightcade match data for ${username}`)
    for (const gamestring in user.gameinfo) {
      console.log(`Getting name of ${gamestring}`)
      let game_name = gamestring
      try {
        const game = await Fightcade.GetGame(gamestring)
        game_name = game.name
      } catch (error) {
        console.log(`Couldn't get name for ${gamestring}`)
      }
      let time_hours = (user.gameinfo[gamestring].time_played / 3600).toFixed(1)
      // Discord embed field limit is 25. Ensure that EmbedBuilders stay below that limit
      if (fcInfo.fields.length < 25) {
        fcInfo.addFields({name: game_name, value: `Time Played: ${time_hours} hours`})
      }
      else {
        console.log("EmbedBuilder field limit reached. Sending message and creating new embed")
        message.channel.send( { embeds: [fcInfo] })
        fcInfo = new EmbedBuilder()
          .setColor('#ff0000')
          .setTitle(`Fightcade match data for ${username} cont.`)
      }
    }
    message.channel.send( { embeds: [fcInfo] })
  } catch (error) {
    console.log(error)
    message.channel.send('Something went wrong!')
  }
}

function register(message, fcUsername) {
  let discordId = message.author.id
  console.log(discordId)
  fcUsers[discordId] = {'DiscordName': message.author.username, 'FCUsername': fcUsername}
  console.log(fcUsers[discordId])
  try {
    accessSync(fcUsersLocation)
    writeFileSync(fcUsersLocation, JSON.stringify(fcUsers), 'utf-8')
    console.log('FC user file written successfully')
    message.channel.send('Registration successful!')
  } catch (err) {
    console.error('There was an issue writing the FC user file')
    console.error(err.message)
    message.channel.send('There was an issue registering your username!!')
  }
}
export const data = new SlashCommandBuilder()
  .setName('fightcade')
  .setDescription('Climb the tower in old games')

export function execute (message, args) {
  if (args[0] == 'register') {
    console.log(`Registering new user:\nID = ${message.author.id}\nDiscord Username = ${message.author.username}\nFC Username = ${args[1]}`)
    register(message, args[1])
  }
  else if (args[0] == 'user') {
    console.log(`Getting info for ${args[1]}`)
    getUser(message, args[1])
  }
  else {
    let userId = message.author.id.toString()
    console.log(`Searching for: ${userId}`)
    console.log(fcUsers[userId].FCUsername)
    getUser(message, fcUsers[userId].FCUsername)
  }
}