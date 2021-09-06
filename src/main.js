const Discord = require('discord.js')
const fs = require('fs')
require('dotenv').config()

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MESSAGE_REACTIONS"] })
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

const prefix = '~'

client.on('ready', async() => {
    console.log('Main.js: Fear not citizen, justice is here.')
    client.user.setActivity("Type ~help for commands")
    //let files = await client.commands.get('training').initialize()
})

client.on('messageCreate', message => {
    if(message.author.bot) {
        console.log('Bot message received.  Ignoring input.')
        return
    } else if(/^\d*d\d+/.test(message) && (message.channel == process.env.SERVER_OCB_DND || message.channel.guild == process.env.SERVER_TEST)) {
        client.commands.get('dnd').execute(message)
    } else if(!message.content.startsWith(prefix)) {
        client.commands.get('TextReact').execute(message)
    } else {
        const args = message.content.slice(prefix.length).split(" ")
        const command = args.shift().toLowerCase()

        if(command === 'enforce') {
            client.commands.get('enforce').execute(message, args)
        } else if(command === 'enka') {
            client.commands.get('enka').execute(message, args)
        }/* else if(command === 'training') {
            client.commands.get('training').execute(message, args)
        } */else if(command === 'help') {
            client.commands.get('help').execute(message, args)
        } else if(command === 'merge') {
            client.commands.get('merge').execute(message, args)
        } else if(command === 'timer') {
            client.commands.get('timer').execute(message, args, client)
        }
    }
})

client.login(process.env.DISCORD_API_KEY)