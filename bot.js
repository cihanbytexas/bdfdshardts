import { ShardingManager } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const manager = new ShardingManager("./shard.js", {
  token: process.env.TOKEN,
  totalShards: "auto", // Discord önerilen shard sayısını otomatik alır
});

manager.on("shardCreate", shard => {
  console.log(`Shard ${shard.id} oluşturuldu`);

  // Shard hazır olduğunda mesaj gönder
  shard.on("ready", async () => {
    try {
      const client = shard.client;
      const channel = await client.channels.fetch(process.env.STATUS_CHANNEL_ID);
      if (channel) {
        channel.send(`✅ Shard ${shard.id} oluşturuldu ve başlatıldı.`);
      }
    } catch (err) {
      console.error(`Shard ${shard.id} ready mesajı gönderilemedi:`, err);
    }
  });

  // Shard başlatılırken hata olursa mesaj gönder
  shard.on("error", async error => {
    console.error(`Shard ${shard.id} error:`, error);
    try {
      const client = shard.client;
      const channel = await client.channels.fetch(process.env.STATUS_CHANNEL_ID);
      if (channel) {
        channel.send(`⚠️ Shard başlatılırken bir hata oluştu: Shard ${shard.id}'s Client took too long to become ready.`);
      }
    } catch (err) {
      console.error(`Shard ${shard.id} error mesajı gönderilemedi:`, err);
    }
  });
});

manager.spawn();
