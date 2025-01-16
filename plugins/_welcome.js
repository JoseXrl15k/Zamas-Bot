export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType || !m.isGroup) return true;

    let chat = global.db.data.chats[m.chat];
    const getMentionedJid = () => {
        return m.messageStubParameters.map(param => `${param}@s.whatsapp.net`);
    };

    let who = m.messageStubParameters[0] + '@s.whatsapp.net';
    let user = global.db.data.users[who];

    // Intentar obtener el nombre de usuario
    let userName = user ? user.name : await conn.getName(who);
    
    // Si no se puede obtener el nombre, usar solo el número (sin @s.whatsapp.net)
    if (!userName) {
        userName = who.split('@')[0]; // Obtener solo la parte numérica del JID
    } else {
        userName = userName.trim(); // Asegurarse que no haya espacios extra
    }

    // Obtener la descripción del grupo
    let groupDesc = groupMetadata.desc ? groupMetadata.desc : '¡No hay descripción establecida!';

    if (chat.welcome && m.messageStubType === 27) {
        this.sendMessage(m.chat, {
            text: `🎉 ¡Bienvenido, ${userName}! 🎉\n\n` +
                  `Estamos encantados de tenerte aquí. Informa aquí:\n\n` +
                  `**Descripción del grupo:**\n${groupDesc}`,
            contextInfo: {
                forwardingScore: 9999999,
                isForwarded: true,
                mentionedJid: getMentionedJid(),
                "externalAdReply": {
                    "title": `  ͟͞ Ｗ Ｅ Ｌ Ｃ Ｏ Ｍ Ｅ ͟͞  `,
                    "body": '© ⍴᥆ᥕᥱrᥱძ ᑲᥡ ᴊσʂє xɾl 😻',
                    "previewType": "PHOTO",
                    "thumbnailUrl": null,
                    "thumbnail": imagen4,
                    "sourceUrl": redes,
                    "showAdAttribution": true
                }
            }
        }, { quoted: fkontak });
    }

    if (chat.welcome && (m.messageStubType === 28 || m.messageStubType === 32)) {
        this.sendMessage(m.chat, {
            text: `👋 Adiós, ${userName}. ¡Te deseamos lo mejor en tus futuros caminos! 👋`,
            contextInfo: {
                forwardingScore: 9999999,
                isForwarded: true,
                mentionedJid: getMentionedJid(),
                "externalAdReply": {
                    "title": `  ͟͞ Ａ Ｄ Ｉ Ｏ Ｓ ͟͞  `,
                    "body": `© ⍴᥆ᥕᥱrᥱძ ᑲᥡ ᴊσʂє xɾl 😻`,
                    "previewType": "PHOTO",
                    "thumbnailUrl": null,
                    "thumbnail": imagen4,
                    "sourceUrl": redes,
                    "showAdAttribution": true
                }
            }
        }, { quoted: fkontak });
    }
}