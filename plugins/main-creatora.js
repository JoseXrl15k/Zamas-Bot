function handler(m) {
let name = conn.getName('595983684583@s.whatsapp.net')
let ownerN = '595983684583'
conn.sendContact(m.chat, [[`${ownerN}@s.whatsapp.net`, `${name}`]], m, {
 contextInfo: { 
 forwardingScore: 2023,
isForwarded: false, 
 externalAdReply: {  
 title: 'Anna 😏💘', 
 body: botname, 
 sourceUrl: 'https://whatsapp.com/channel/0029VayKQ561CYoY6vTe4B2u',
 thumbnail: imagen1,
 thumbnailUrl: 'https://qu.ax/rnlyX.jpg', 
 mediaType: 1,
 showAdAttribution: true, 
 renderLargerThumbnail: false
 }
   }
     },
       {
         quoted: fkontak
           }
             );

}

handler.help = ['owner2']
handler.tags = ['main']
handler.command = ['owner2', 'creatora', 'creadora', 'dueña', 'fgowner2'] 

export default handler