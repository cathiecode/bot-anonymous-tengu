const Discord = require('discord.js')

const client = new Discord.Client()

const TOKEN = process.env.DISCORD_TOKEN

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {
  if (msg.author.bot || msg.mentions.everyone || !msg.mentions.has(client.user)) return;
  console.log("メッセージを受信")
  const pure_content = msg.content.replace(/<.+?>\s?|^\s|\s$/gm, "")
  const converted_content = pure_content.replace(/^/gm, ":japanese_goblin: ")
  await msg.channel.send(converted_content)
});

client.login(TOKEN);