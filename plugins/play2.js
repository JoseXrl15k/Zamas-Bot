import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';

const LimitVid = 425 * 1024 * 1024; // 425MB
const handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (command === 'play2' || command === 'video') {
        if (!text) return m.reply(`*🤔 ¿Qué está buscando? 🤔*\n*Ingrese el nombre de la canción*\n\n*Ejemplo:*\n${usedPrefix}play emilia 420`);

        const yt_play = await search(args.join(' '));
        if (!yt_play.length) return m.reply(`*🤷 No se encontró ningún resultado para "${text}"*`);

        const videoInfo = yt_play[0];
        await conn.sendFile(m.chat, videoInfo.thumbnail, 'thumbnail.jpg', `
            *🎶 Título:* ${videoInfo.title}
            *⏰ Duración:* ${secondString(videoInfo.duration.seconds)}
            *👉🏻 Aguarde un momento mientras envío su video...*`, m, null, fake);

        // Intentar obtener el video usando tu API
        try {
            const res = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${videoInfo.url}`);
            const { data } = await res.json();

            if (!data.dl) throw new Error("No se pudo obtener el enlace de descarga");

            const fileSize = await getFileSize(data.dl);
            if (fileSize > LimitVid) {
                await conn.sendMessage(m.chat, {
                    document: { url: data.dl },
                    fileName: `${videoInfo.title}.mp4`,
                    caption: `🔰 Aquí está tu video \n🔥 Título: ${videoInfo.title}`
                }, { quoted: m });
            } else {
                await conn.sendMessage(m.chat, {
                    video: { url: data.dl },
                    fileName: `${videoInfo.title}.mp4`,
                    caption: `🔰 Aquí está tu video \n🔥 Título: ${videoInfo.title}`,
                    thumbnail: videoInfo.thumbnail,
                    mimetype: 'video/mp4'
                }, { quoted: m });
            }
            return; // Salir después de descargar
        } catch (e) {
            console.error('Error usando tu API:', e);
        }

        // Si la primera API falla, intenta otras opciones
        try {
            const res = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${videoInfo.url}`);
            const { result } = await res.json();
            await conn.sendMessage(m.chat, {
                video: { url: result.download.url },
                fileName: `${videoInfo.title}.mp4`,
                caption: `🔰 Aquí está tu video \n🔥 Título: ${videoInfo.title}`
            }, { quoted: m });
            return;
        } catch (e) {
            console.error('Error con Zenkey:', e);
        }

        // Aquí puedes seguir añadiendo más APIs o métodos de descarga
        await m.reply(`*❌ No se pudo obtener el video de ninguna API.*`);
    }
};

handler.help = ['play', 'play2', 'video'];
handler.tags = ['downloader'];
handler.command = ['play', 'play2', 'video'];
handler.register = true;

export default handler;

async function search(query, options = {}) {
    const searchResult = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
    return searchResult.videos;
}

function secondString(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${d > 0 ? d + (d === 1 ? ' día, ' : ' días, ') : ''}${h > 0 ? h + (h === 1 ? ' hora, ' : ' horas, ') : ''}${m > 0 ? m + (m === 1 ? ' minuto, ' : ' minutos, ') : ''}${s > 0 ? s + (s === 1 ? ' segundo' : ' segundos') : ''}`;
}

async function getFileSize(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        const contentLength = response.headers.get('content-length');
        return contentLength ? parseInt(contentLength, 10) : 0;
    } catch (error) {
        console.error("Error al obtener el tamaño del archivo", error);
        return 0;
    }
}