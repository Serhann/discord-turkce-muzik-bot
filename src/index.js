import { Client } from 'discord.js';
import { settings } from './config.json';

const client = new Client();
const ytdl = require('ytdl-core');

client.on('ready', () => {
    console.log("I am connected!");
});

client.on('message', async msg => {
    if (!msg.content.startsWith(settings.prefix) || !msg.guild) return;

    const args = msg.content.split(" ");
    const command = args[0].toLowerCase().split(settings.prefix)[1];

    switch (command) {
        case "çal":
            if (msg.member.voice.channel) {
                if (!args[1]) return msg.reply('Lütfen bir youtube linki belirt. `'+settings.prefix+'çal <link>`');

                const connection = await msg.member.voice.channel.join();
                const dispatcher = connection.play(ytdl(args[1]));

            } else return msg.reply('Herhangi bir ses kanalına bağlı olduğunu göremiyorum.');

            break;
    
        default:
            break;
    }
});

client.login(settings.token);