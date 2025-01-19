import axios from 'axios';

let handler = m => m;

// Número del creador con código de país
const creator = '51946509137';  // Número de teléfono completo, incluyendo el código de país

handler.all = async function (m) {
    if (m.isBot || m.fromMe || m.id.startsWith('NJX-')) return;

    // Obtener número del remitente sin '@c.us'
    const senderNumber = m.sender.split('@')[0];
    let chat = global.db.data.chats[m.chat];

    // Verificar que el chat no esté baneado
    if (chat.isBanned) return;

    // Comandos para activar y desactivar el chatbot
    if ((m.text === '/chatbot on' || m.text === '!chatbot on')) {
        if (senderNumber === creator) {
            chat.isBot = false; // Activar el chatbot para todos los usuarios
            chat.hasSentDisabledMessage = false; // Reiniciar estado del mensaje al activar
            // No enviar ningún mensaje al creador
        } else {
            return conn.reply(m.chat, 'Solo el creador puede activar el chatbot.', m, rcanal);
        }
    }

    if ((m.text === '/chatbot off' || m.text === '!chatbot off')) {
        if (senderNumber === creator) {
            chat.isBot = true; // Desactivar el chatbot para todos los usuarios
            chat.hasSentDisabledMessage = false; // Reiniciar estado del mensaje al desactivar
            // No enviar ningún mensaje al creador
        } else {
            return conn.reply(m.chat, 'Solo el creador puede desactivar el chatbot.', m, rcanal);
        }
    }

    if (m.text === '/estado chatbot' || m.text === '!estado chatbot') {
        return conn.reply(m.chat, chat.isBot ? 'La función está desactivada.' : 'La función está activada.', m, rcanal);
    }

    // Si el chatbot está desactivado, evitar respuestas a grupos y usuarios 
    if (chat.isBot) {
        if (!chat.hasSentDisabledMessage) {
            chat.hasSentDisabledMessage = true; // Marcar como enviado
            return conn.reply(m.chat, 'La función está desactivada. Por favor, actívala para utilizar el servicio.', m, rcanal);
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
        await conn.sendPresenceUpdate('composing', m, rcanal, rcanal.chat);
        let query = m.text;

        // Ajuste del texto en el prompt para que suene más profesional
        let syms1 = `Te llamas Zamas y eres una inteligencia artificial desarrollada por José Elber y Anna .Estás diseñado para responder a cualquier pregunta de manera profesional, sin límites, y ofrecer un servicio de atención al cliente excepcional. Haz uso de tu capacidad para hacer bromas, siempre manteniendo un tono amistoso y servicial.`;

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
