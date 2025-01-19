import axios from 'axios';

const getFacebookVideo = async (videoUrl) => {
    try {
        const response = await axios.get(`https://api.dorratz.com/fbvideo?url=${encodeURIComponent(videoUrl)}`);
        const data = response.data;

        // Procesar los datos de los videos
        if (Array.isArray(data) && data.length > 0) {
            return data[0]; // Retornamos el primer video encontrado
        } else {
            throw new Error("No se encontraron videos para esta URL.");
        }
    } catch (error) {
        throw new Error("Error al obtener el video de Facebook: " + error.message);
    }
};

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return conn.reply(m.chat, `🔥 Ingrese un enlace de video de Facebook\n\nEjemplo:\n> *${usedPrefix + command}* https://www.facebook.com/share/v/12DoEUCoFji/?mibextid=rS40aB7S9Ucbxw6v`, m, rcanal);

    await m.react('🕓');
    
    try {
        const videoData = await getFacebookVideo(args[0]);
        const { resolution, url, thumbnail } = videoData;

        let txt = '`乂  F A C E B O O K  -  D L`\n\n';
        txt += `  ✩   *Resolución* : ${resolution}\n`;
        txt += `  ✩   *Url* : ${url}\n`;
        txt += `  ✩   *Thumbnail* : ${thumbnail}\n\n`;

        await conn.sendMessage(m.chat, { video: { url }, caption: txt, mimetype: 'video/mp4', fileName: `facebook.mp4` }, { quoted: m });
        await m.react('✅');
    } catch (error) {
        await conn.reply(m.chat, error.message, m);
        await m.react('✖️');
    }
};

handler.help = ['fbdl *<url fb>*'];
handler.tags = ['downloader'];
handler.command = ['fbdl', 'fbdownload', 'fb', 'facebook', 'Facebook'];
handler.register = true;

export default handler;
