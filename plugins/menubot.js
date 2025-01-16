let handler = async (m, { text, conn, usedPrefix, command }) => {
let texto = `

*\`¡Bienvenido a Zamas Bot! Este innovador bot de WhatsApp, creado por José, está diseñado para ofrecerte herramientas útiles, entretenimiento y acceso a diversas funciones de manera rápida y sencilla.\`*

*\`Nuestro compromiso es proporcionarte un servicio de alta calidad, y estamos en constante desarrollo para mejorar la experiencia de nuestros usuarios. Agradecemos tu confianza y esperamos que disfrutes de todas las funcionalidades que Zamas Bot tiene para ofrecerte. ¡Gracias por ser parte de esta experiencia!\`*
`
 await conn.sendMessage(m.chat, {
      image: { url: 'https://qu.ax/HGqex.jpg' },
      caption: texto,
      footer: botname,
      buttons: [
        {
          buttonId: `.menucompleto`,
          buttonText: {
            displayText: 'MENU COMPLETO',
          },
        },
        {
          buttonId: `.serbot`,
          buttonText: {
            displayText: 'SERBOT',
          },
        },
        {
          buttonId: `.grupos`,
          buttonText: {
            displayText: 'GRUPOS DEL BOT',
          },
        },        
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: m });
}
handler.command = ['menu']
handler.help = ['menu']
handler.tags = ['main']
export default handler