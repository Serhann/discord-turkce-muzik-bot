import { Client, Guild, GuildMember, StreamDispatcher, VoiceConnection } from 'discord.js';
import { settings } from './config.json';

const client = new Client();
const ytdl = require('ytdl-core');

enum PlayerStatus {
    PLAYING = 'PLAYING',
    PAUSED = 'PAUSED'
}

type Song = {
    url: string,
    requestedBy: GuildMember
}

type GuildPlayer = {
    guildId: string,
    voiceId: string,
    connection: VoiceConnection,
    dispatcher?: StreamDispatcher,
    status: PlayerStatus,
    queue: Song[]
}

let players: GuildPlayer[] = [];

client.on('ready', () => {
    console.log('I am connected!');
});

client.on('message', async msg => {
    if (!msg.content.startsWith(settings.prefix)) return;
    if (!msg.guild || !msg.member) return;

    const args = msg.content.split(' ');
    const command = args[0].toLowerCase().split(settings.prefix)[1];

    const player = players.find(player => player.guildId === msg.guild?.id);

    switch (command) {
        case 'çal':
            if (player) {
                if (await addQueue(msg.guild, msg.member, args[1])) return msg.reply('Başarıyla kuyruğa eklendi!');
            } else {
                if (msg.member.voice?.channel) {
                    if (!args[1]) return msg.reply('Lütfen bir youtube linki belirt. `'+settings.prefix+'çal <link>`');

                    const connection = await msg.member.voice.channel.join();

                    players.push({
                        guildId: msg.guild.id,
                        voiceId: msg.member.voice.id,
                        connection,
                        status: PlayerStatus.PLAYING,
                        queue: []
                    });

                    const player = players.find(player => player.guildId === msg.guild?.id);

                    if (player) {
                        await addQueue(msg.guild, msg.member, args[1]);

                        const dispatcher = connection.play(ytdl(player?.queue[0].url));

                        player.dispatcher = dispatcher;

                        msg.reply('Çalınıyor.');

                        dispatcher.on('finish', () => {
                            player.queue.shift();

                            if (player.queue.length > 0) {
                                const dispatcher = connection.play(ytdl(player?.queue[0].url));

                                player.dispatcher = dispatcher;

                                msg.reply('Bir sonraki şarkı çalınıyor.');
                            } else {
                                players = players.filter(player => player.guildId !== msg.guild?.id);

                                player.connection.voice?.channel?.leave();

                                msg.reply('Kuyruk tamamlandı. Ayrıldım.');
                            }
                        })
                    } else return msg.reply('Bir hata oluştu!');
                } else return msg.reply('Herhangi bir ses kanalına bağlı olduğunu göremiyorum.');    
            }

            break;

            case 'dur':
                if (player) {
                    if (player.voiceId === msg.member.voice.id) {
                        if (player.queue[0].requestedBy === msg.member || msg.member.hasPermission("ADMINISTRATOR")) {
                            if (player.status === PlayerStatus.PAUSED) return msg.reply('Zaten durdurulmuş!');

                            msg.reply('Durdurdum!');
                            player.dispatcher?.pause();
                            player.status = PlayerStatus.PAUSED;
                        } else return msg.reply('Şu an çalan şarkıyı sadece `'+player.queue[0].requestedBy.nickname+'` ya da yetkili birisi durdurabilir.');
                    } else return msg.reply('Şarkı çaldığım kanalda değilsin!');
                } else return msg.reply('Henüz şarkı çalmıyorum..');
    
                break;

            case 'devam':
                if (player) {
                    if (player.voiceId === msg.member.voice.id) {
                        if (player.queue[0].requestedBy === msg.member || msg.member.hasPermission("ADMINISTRATOR")) {
                            if (player.status === PlayerStatus.PLAYING) return msg.reply('Zaten devam ediyor!');

                            msg.reply('Devam ediyor!');
                            player.dispatcher?.resume();
                            player.status = PlayerStatus.PLAYING;
                        } else return msg.reply('Şu an çalan şarkıyı sadece `'+player.queue[0].requestedBy.nickname+'` ya da yetkili birisi başlatabilir.');
                    } else return msg.reply('Şarkı çaldığım kanalda değilsin!');
                } else return msg.reply('Henüz şarkı çalmıyorum..');
    
                break;

            case 'geç':
                if (player) {
                    if (player.voiceId === msg.member.voice.id) {
                        if (player.queue[0].requestedBy === msg.member || msg.member.hasPermission("ADMINISTRATOR")) {
                            msg.reply('Geçtim!');
                            player.dispatcher?.end();
                        } else return msg.reply('Şu an çalan şarkıyı sadece `'+player.queue[0].requestedBy.nickname+'` ya da yetkili birisi geçebilir.');
                    } else return msg.reply('Şarkı çaldığım kanalda değilsin!');
                } else return msg.reply('Henüz şarkı çalmıyorum..');
    
                break;
    
        default:
            break;
    }
});

async function addQueue(guild: Guild, requestedBy: GuildMember, url: string) {
    const guildPlayer = players.find(player => player.guildId === guild.id);
    if (!guildPlayer) throw new Error('Bu sunucunun bir kuyruğu yok!');

    guildPlayer.queue.push({ url, requestedBy });
    return true;
}

client.login(settings.token);