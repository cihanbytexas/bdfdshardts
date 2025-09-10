import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log(`Shard ${client.shard.ids[0]} hazır!`);
});

client.on("messageCreate", message => {
  if (message.content === "!ping") {
    message.channel.send(`Pong! Shard: ${client.shard.ids[0]}`);
  }
});

client.login(process.env.TOKEN);
