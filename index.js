import { Client } from 'discord.js';
import { getInfo } from 'ytdl-core';

const settings = {
    token: '',
    prefix: '!'
};

const client = new Client();

client.on('ready', () => {
    console.log("I am connected!");
});

client.on('message', async msg => {
    if (!msg.content.startsWith(settings.prefix) || !msg.guild) return;

    const args = msg.content.split(" ");

    console.log(args);
});

client.login(settings.token);