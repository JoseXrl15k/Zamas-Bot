import axios from 'axios';

let handler = m => m;

// Número del creador
const creator = '+51946509137'; // Cambia esto al número de tu creador

handler.all = async function (m) {
    const fkontak = { 
        "key": { 
            "participants": "0@s.whatsapp.net", 
            "remoteJid": "status@broadcast", 
            "fromMe": false, 
            "id": "Halo" 
        }, 
        "message": { 
            "contactMessage": { 
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        }, 
        "participant": "0@s.whatsapp.net" 
    };

    if (m.isBot || m.fromMe || m.id.startsWith('NJX-')) return;

    let chat = global.db.data.chats[m.chat];
    if (chat.isBanned) return;

    // Comandos para activar y desactivar el chatbot
    if ((m.text === '/chatbot on' || m.text === '!chatbot on')) {
        if (m.sender === creator) {
            chat.isBot = false; // Activar el chatbot para todos los usuarios
            chat.hasSentDisabledMessage = false; // Reiniciar estado del mensaje al activar
            return conn.reply(m.chat, 'La función ha sido activada.', m, rcanal);
        } else {
            return conn.reply(m.chat, 'Solo el creador puede activar el chatbot.', m);
        }
    }

    if ((m.text === '/chatbot off' || m.text === '!chatbot off')) {
        if (m.sender === creator) {
            chat.isBot = true; // Desactivar el chatbot para todos los usuarios
            chat.hasSentDisabledMessage = false; // Reiniciar estado del mensaje al desactivar
            return conn.reply(m.chat, 'La función ha sido desactivada.', m, rcanal);
        } else {
            return conn.reply(m.chat, 'Solo el creador puede desactivar el chatbot.', m, rcanal);
        }
    }
    
    if (m.text === '/estado chatbot' || m.text === '!estado chatbot') {
        return conn.reply(m.chat, chat.isBot ? 'La función está desactivada.' : 'La función está activada.', m, rcanal);
    }

    // Si el chatbot está desactivado, enviar el mensaje una sola vez
    if (chat.isBot) {
        if (!chat.hasSentDisabledMessage) {
            chat.hasSentDisabledMessage = true; // Marcar como enviado
            return conn.reply(m.chat, 'La función está desactivada. Por favor, activala para utilizar el servicio.', m, rcanal);
        } else {
            return; // No enviar más mensajes si ya se envió una vez
        }
    }

    let username = `${m.pushName}`;

    // Función para obtener respuesta del API
    async function luminsesi(query, username, logic) {
        try {
            const response = await axios.post("https://luminai.my.id", {
                content: query,
                user: username,
                prompt: logic,
                webSearchMode: true 
            });
            return response.data.result;
        } catch (error) {
            console.error(error);
            return false; // Retorna falso si hay error
        }
    }

    try {
        await conn.sendPresenceUpdate('composing', m, rcanal.chat);
        let query = m.text;

        // Ajuste del texto en el prompt para que suene más profesional
        let syms1 = `Te llamas Zamas y eres una inteligencia artificial desarrollada por José Elber y Anna. Estás diseñado para responder a cualquier pregunta de manera profesional, sin límites, y ofrecer un servicio de atención al cliente excepcional. Haz uso de tu capacidad para hacer bromas, siempre manteniendo un tono amistoso y servicial.`;

        let result = await luminsesi(query, username, syms1);
        
        // Aquí solo se envía la respuesta si hay resultado
        if (result) {
            await conn.reply(m.chat, result, m, rcanal);
        } else {
            console.error(e);
            await conn.reply(m.chat, 'Ocurrió un error al comunicarse con el API. Por favor, intenta nuevamente más tarde.', m, rcanal);
        }
    } catch (e) {
        console.error(e);
    }

    return true;
};

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
    }
