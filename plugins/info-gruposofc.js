
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
  let grupos = `*Hola!, te invito a unirte al grupo oficial de la Bot para convivir con la comunidad* 
  
  https://chat.whatsapp.com/CX0KRkfViZS0jKZHkTJlCM`

  await conn.sendMessage(m.chat, {
    image: imagen3,
    caption: grupos,
    footer: 'Selecciona una opción',
    buttons: [
      {
        buttonId: `.allmenu`,
        buttonText: { displayText: 'Menu de Comandos ' },
      },
      {
        buttonId: `.serbot`,
        buttonText: { displayText: 'Ser Sub Bot ' },
      },
    ],
    viewOnce: true,
    headerType: 4,
  })

  await m.react(emojis)
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']

export default handler