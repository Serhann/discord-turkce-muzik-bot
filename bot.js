const Discord = require('discord.js');
const ytdl = require('ytdl-core');

const client = new Discord.Client({ fetchAllMembers: false, apiRequestMethod: 'sequential' });


client.login("acayip gizli tokenimiz").then(() => console.log('giirş yapıldı')).catch(console.error);

const connections = new Map();

let broadcast;

client.on('message', m => {
  if (!m.guild) return;
  if (m.content.startsWith('/gir')) {
    const channel = m.guild.channels.get(m.content.split(' ')[1]) || m.member.voiceChannel;
    if (channel && channel.type === 'voice') {
      channel.join().then(conn => {
        conn.player.on('error', (...e) => console.log('player', ...e));
        if (!connections.has(m.guild.id)) connections.set(m.guild.id, { conn, queue: [] });
        m.reply('tamamdır!');
      });
    } else {
      m.reply('Lütfen bir sesli kanala giriniz!');
    }
  } else if (m.content.startsWith('/çal')) {
    if (connections.has(m.guild.id)) {
      const connData = connections.get(m.guild.id);
      const queue = connData.queue;
      const url = m.content.split(' ').slice(1).join(' ')
        .replace(/</g, '')
        .replace(/>/g, '');
      queue.push({ url, m });
      if (queue.length > 1) {
        m.reply(`İstediğiniz müzik ${queue.length - 1} adet müzikten sonra çalacak`);
        return;
      }
      doQueue(connData);
    }
  } else if (m.content.startsWith('/geç')) {
    if (connections.has(m.guild.id)) {
      const connData = connections.get(m.guild.id);
      if (connData.dispatcher) {
        connData.dispatcher.end();
      }
    }
  } else if (m.content.startsWith('/kuyruk')) {
    if (connections.has(m.guild.id)) {
      const connData = connections.get(m.guild.id);
      const queue = connData.queue;
      m.reply(queue);
    }
  }
});

function doQueue(connData) {
  const conn = connData.conn;
  const queue = connData.queue;
  const item = queue[0];
  if (!item) return;
  const stream = ytdl(item.url, { filter: 'audioonly' }, { passes: 3 });
  const dispatcher = conn.playStream(stream);
  stream.on('info', info => {
    item.m.reply(`Çalınan: **${info.title}**`);
  });
  dispatcher.on('end', () => {
    queue.shift();
    doQueue(connData);
  });
  dispatcher.on('error', (...e) => console.log('dispatcher', ...e));
  connData.dispatcher = dispatcher;
}
