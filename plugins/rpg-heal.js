let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    if (!user) {
        return conn.reply(m.chat, '👤 El usuario no se encuentra en la base de Datos.', m, rcanal);
    }
    if (user.cookies < 20) {
        return conn.reply(m.chat, '💔 No tienes suficientes cookies para curarte. Necesitas al menos 50 cookies.', m, rcanal);
    }
    let healAmount = 40; 
    user.health += healAmount;
    user.cookies -= 20; 
    if (user.health > 100) {
        user.health = 100; 
    }
    user.lastHeal = new Date();
    let info = `❤️ *Te has curado ${healAmount} puntos de salud.*\n🍪 *cookies restantes:* ${user.cookies}\n❤️ *Salud actual:* ${user.health}`;
    await conn.sendMessage(m.chat, { text: info }, { quoted: m });
};

handler.help = ['heal'];
handler.tags = ['rpg'];
handler.command = /^(heal)$/i;

export default handler;
