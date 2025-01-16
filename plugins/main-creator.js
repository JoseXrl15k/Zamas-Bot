function handler(m) {
let name = conn.getName('51946509137@s.whatsapp.net')
let ownerN = '51946509137'
conn.sendContact(m.chat, [[`${ownerN}@s.whatsapp.net`, `${name}`]], m, {
 contextInfo: { 
 forwardingScore: 2023,
isForwarded: false, 
 externalAdReply: {  
 title: dev, 
 body: botname, 
 sourceUrl: 'https://whatsapp.com/channel/0029VayKQ561CYoY6vTe4B2u',
 thumbnail: imagen1,
 thumbnailUrl: 'https://qu.ax/rnlyX.jpg', 
 mediaType: 1,
 showAdAttribution: true, 
 renderLargerThumbnail: true 
 }
   }
     },
       {
         quoted: fkontak
           }
             );

}

handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño', 'fgowner'] 

export default handler