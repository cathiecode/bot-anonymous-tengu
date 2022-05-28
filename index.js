const { Client, Intents } = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command);
}

const rest = new REST({ version: '9' }).setToken(token);
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
      Routes.applicationCommands(clientId),
			{ body: commands.map(command => command.data.toJSON()) },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}

  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    
    const command = commands.find(command => command.data.name === interaction.commandName);
    if (!command) {
      console.error("Unknown command:", interaction.commandName);
      return;
    }
    command.run(interaction);
  });

  console.log("Logged in:", await client.login(token));
})();