import fetch from 'node-fetch'; 

let handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) {
    return conn.reply(m.chat, `*\`🚩 Ingresa el nombre de la aplicación que deseas buscar en la Play Store.\`*\n\n*\`Ejemplo:\`*\n*\`${usedPrefix + command} WhatsApp\`*`, m, rcanal); 
  }

  let res;
  try {
    res = await fetch(`https://dark-shan-yt.koyeb.app/search/playstore?q=${encodeURIComponent(text)}`);
    if (!res.ok) throw new Error('Error en la conexión a la API');
    res = await res.json();
    if (!res.status || !res.data.length) {
      return conn.reply(m.chat, `No se encontraron resultados para ${text}.`, m, rcanal); 
    }
  } catch (error) {
    return conn.reply(m.chat, `Ocurrió un error al buscar en la Play Store: ${error.message}`, m, rcanal); 
  }

  let resultText = res.data.map(
    (v) =>
      `*\`🎉.- Resultado:\`* ${v.nama}\n` +
      `*\`👨‍💻.- Desarrollador:\`* ${v.developer}\n` +
      `*\`⭐.- Puntuación:\`* ${v.rate}\n` +
      `*\`🔗.- Link:\`* ${v.link}`
  ).join("\n\n");

  let opt = {
    contextInfo: {
      externalAdReply: {
        title: res.data[0].nama,
        body: res.data[0].developer,
        thumbnail: res.data[0].img,
        sourceUrl: res.data[0].link,
      },
    },
    quoted: m,
  };

  // Enviar la respuesta - solo rcanal aquí también
  await conn.sendMessage(m.chat, { text: resultText }, { quoted: m, ...opt }, null, rcanal);
};

handler.help = ['playstore'];
handler.tags = ['dl'];
handler.command = /^(playstore|plays|playstoresearch)$/i;

export default handler;
