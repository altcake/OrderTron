import { Client, Collection } from 'discord.js'
import { readdirSync } from 'fs'
import dotenv from 'dotenv'

dotenv.config()

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES', 'GUILD_MESSAGE_REACTIONS'] })
client.commands = new Collection()

const commandFiles = readdirSync('./src/commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
  import(`./commands/${file}`)
    .then(command => {
      console.log(`Command detected: ${command.name}`)
      client.commands.set(command.name, command)
    })
    .catch(error => {
      console.error(error)
    })
}

const prefix = process.env.PREFIX

client.on('ready', async () => {
  console.log('Main.js: Fear not citizen, justice is here.')
  client.user.setActivity(`Type ${prefix}help for commands`)
  // let files = await client.commands.get('training').initialize()
})

client.on('messageCreate', message => {
  if (message.author.bot) {
    console.log('Bot message received.  Ignoring input.')
  } else if (/^\d*[dD]\d+/.test(message) && (message.channel.id === process.env.SERVER_OCB_DND || message.channel.guild.id === process.env.SERVER_TEST)) {
    client.commands.get('dnd').execute(message)
  } else if (!message.content.startsWith(prefix)) {
    client.commands.get('TextReact').execute(message)
  } else {
    const args = message.content.slice(prefix.length).split(' ')
    const command = args.shift().toLowerCase()

    switch (command) {
      case 'enforce': client.commands.get('enforce').execute(message, args); break
      case 'enka': client.commands.get('enka').execute(message, args); break
      case 'help': client.commands.get('help').execute(message, args); break
      case 'merge': client.commands.get('merge').execute(message, args, 'br'); break
      case 'brmerge': client.commands.get('merge').execute(message, args, 'br'); break
      case 'ggmerge': client.commands.get('merge').execute(message, args, 'gg'); break
      case 'timer': client.commands.get('timer').execute(message, args); break
      case 'nick': client.commands.get('nick').execute(message, args); break
      case 'report': client.commands.get('TextReact').report(message); break
      default: message.channel.send({ content: '(???????????)???????????????\ncease your activities' })
    }
  }
})

client.login(process.env.DISCORD_API_KEY)
