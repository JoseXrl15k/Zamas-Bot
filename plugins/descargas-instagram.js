import { igdl } from "ruhend-scraper";

let handler = async (m, { args, conn }) => { 
    if (!args[0]) {
        return conn.reply(m.chat, '*\`Ingresa El link Del vídeo a descargar 🔥\`*', m, rcanal);
    }
    
    try {
        await m.react('🕑');
        
        let res = await igdl(args[0]);
        let data = res.data; 
        
        for (let media of data) {
            await new Promise(resolve => setTimeout(resolve, 2000));

            await m.react('✅');
            await conn.sendFile(m.chat, media.url, 'instagram.mp4', dev, null, m); 
        }
    } catch {
        await m.react('❌');
    }
}

//handler.cookies = 2
handler.command = ['ig2', 'igdl2', 'instagram2'];
handler.tags = ['descargas'];
handler.help = ['ig2 *<link>*'];

export default handler;
