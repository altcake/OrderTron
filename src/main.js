import { Client, Collection, Events, GatewayIntentBits, REST, Routes } from 'discord.js'
import { readdirSync } from 'fs'
import dotenv from 'dotenv'

dotenv.config()

const client = new Client({ intents: [
                                    GatewayIntentBits.Guilds,
                                    GatewayIntentBits.GuildMessages,
                                    GatewayIntentBits.DirectMessages,
                                    GatewayIntentBits.GuildMessageReactions,
                                    GatewayIntentBits.MessageContent]})
client.commands = new Collection()

const commandFiles = readdirSync('./src/commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
  import(`./commands/${file}`)
  .then(command => {
    console.log(`Command detected: ${command.data.name}`)
    client.commands.set(command.data.name, command)
  })
  .catch(error => {
    console.error(error)
  })
}

const eventFiles = readdirSync('./src/events/').filter(file => file.endsWith('.js'))
for (const file of eventFiles) {
  import(`./events/${file}`)
  .then(command => {
    console.log(`Command detected: ${command.name}`)
    client.commands.set(command.name, command)
  })
  .catch(error => {
    console.error(error)
  })
}

const prefix = process.env.PREFIX

client.once(Events.ClientReady, readyClient => {
  console.log('Main.js: Fear not citizen, justice is here.')
  client.user.setActivity(`Type ${prefix}help for commands`)
})

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
})

client.on(Events.MessageCreate, message => {
  if (message.author.bot) {
    console.log('Bot message received.  Ignoring input.')
  } else if (/^\d*[dD]\d+/.test(message) && (message.channel.id === process.env.SERVER_OCB_DND || message.channel.id === process.env.SERVER_OCB_DND_ROLL || message.channel.guild.id === process.env.SERVER_TEST)) {
    client.commands.get('dnd').execute(message)
  } else if (!message.content.startsWith(prefix)) {
    client.commands.get('TextReact').execute(message)
  } 
  else {
    const args = message.content.slice(prefix.length).split(' ')
    const command = args.shift().toLowerCase()
    console.log(args)
    switch (command) {
      case 'enforce': client.commands.get('enforce').execute(message, args); break
      case 'merge': client.commands.get('merge').execute(message, args, 'br'); break
      case 'brmerge': client.commands.get('merge').execute(message, args, 'br'); break
      case 'ggmerge': client.commands.get('merge').execute(message, args, 'gg'); break
      case 'ggbmmerge': client.commands.get('merge').execute(message, args, 'ggbm'); break
      case 'mjmerge': client.commands.get('merge').execute(message, args, 'mj'); break
      case 'buckmerge': client.commands.get('merge').execute(message, args, 'buck'); break
      case 'report': client.commands.get('TextReact').report(message); break
      case 'maintenance': client.commands.get('Maintenance').execute(message, args); break
      case 'fightcade': client.commands.get('fightcade').execute(message, args); break
      case 'brownadd': client.commands.get('TextReact').addLink(message, args, 'brown'); break
      default: message.channel.send({ content: '(┛◉Д◉)┛彡┻━┻\ncease your activities' })
    }
  }
})

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error)
})

client.login(process.env.DISCORD_API_KEY)
