import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) {
    await m.react('✖️');
    return conn.reply(m.chat, '🔥 Ingresa un enlace de YouTube.', m, rcanal);
  }

  const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  if (!ytRegex.test(text)) {
    await m.react('❌');
    return conn.reply(m.chat, '🔥 Ingresa un enlace válido de YouTube.', m, rcanal);
  }

  try {
    await m.react('🕒');

    let videoId = text.split('v=')[1]?.split('&')[0] || text.split('/').pop();
    let apiURL = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

    let response = await fetch(apiURL);
    if (!response.ok) throw new Error('No se pudo obtener información del video. Verifica la URL proporcionada.');

    let videoData = await response.json();

    let ytData = {
      url: text,
      title: videoData.title || 'Sin título',
      thumbnail: videoData.thumbnail_url || `https://img.youtube.com/vi/${videoId}/0.jpg`
    };

    await conn.sendMessage(m.chat, {
      audio: {
        url: `https://kepolu-ytdl.hf.space/yt/dl?url=${ytData.url}&type=audio`
      },
      mimetype: 'audio/mpeg',
      contextInfo: {
        externalAdReply: {
          title: ytData.title,
          body: 'zᥲmᥲs ᑲ᥆𝗍 ⍴᥆ᥕᥱrᥱძ ᑲᥡ ȷ᥆sᥱ',
          mediaType: 2,
          mediaUrl: ytData.url,
          thumbnailUrl: ytData.thumbnail,
          sourceUrl: ytData.url,
          containsAutoReply: true,
          renderLargerThumbnail: true,
          showAdAttribution: false,
        }
      }
    }, { quoted: m });

    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('❌');
    return conn.reply(m.chat, 'Ocurrió un error al intentar descargar el audio.', m);
  }
};

handler.help = ['ytmp3 *<url>*'];
handler.command = ['ytmp3'];
handler.tags = ['dl'];
export default handler;