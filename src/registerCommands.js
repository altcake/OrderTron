import { REST, Routes } from "discord.js"
import { readdirSync } from 'node:fs'
import dotenv from 'dotenv'

dotenv.config()

const commands = []
// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.DISCORD_API_KEY)

async function findCommands() {
	const commandFiles = readdirSync('./src/commands/').filter(file => file.endsWith('.js'))
	try {
		return await Promise.all(commandFiles.map(file => import(`./commands/${file}`)))
	} catch (error) {
		console.error(error)
	}
}


// and deploy your commands!
async function updateSlashCommands() {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.DISCORD_APP_ID, process.env.SERVER_TEST),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`)
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error)
	}
}

const foundCommands = await findCommands()
for (const item of foundCommands) {
	console.log(`Command detected: ${item.data.name}`)
	commands.push(item.data.toJSON())
}
updateSlashCommands()
