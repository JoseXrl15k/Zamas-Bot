

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw m.reply(`Ingresa un link de mediafire\n*📂 Ejemplo:* ${usedPrefix}${command} https://www.mediafire.com/file/2v2x1p0x58qomva/WhatsApp_Messenger_2.24.21.8_beta_By_WhatsApp_LLC.apk/file`);
    
    // Reacción de cargando
    await conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

    try {
        let ouh = await fetch(`https://api.agatz.xyz/api/mediafire?url=${text}`);
        let gyh = await ouh.json();

        // Verificar si hay un error en la respuesta de la API
        if (!gyh.data || gyh.data.length === 0) {
            // Enviar reacción de error
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
            return conn.reply(m.chat, `❌ El enlace de Mediafire es inválido o ha ocurrido un error.`, m, rcanal);
        }

        // Enviar el archivo
        await conn.sendFile(m.chat, gyh.data[0].link, `${gyh.data[0].nama}`, `*🔥 Nombre:* ${gyh.data[0].nama}\n*📂 Tamaño:* ${gyh.data[0].size}\n*🌩 Extensión:* ${gyh.data[0].mime}\n> ˙˚ʚ₍ ᐢ. ̫ .ᐢ ₎ɞ˚ ᴢᴀᴍᴀs ʙᴏᴛ`, m, rcanal);
        
        // Enviar reacción de éxito
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (error) {
        console.error(error);
        // Enviar reacción de error
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
        // Enviar mensaje de error al usuario
        await conn.reply(m.chat, `❌ Ocurrió un error al procesar tu solicitud.`, m, rcanal);
    }
}

handler.help = ['mediafire'];
handler.tags = ['descargas'];
handler.command = /^(mediafire|mf)$/i;
handler.premium = true;
handler.register = true;
handler.group = true;

export default handler;