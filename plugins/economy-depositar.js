import db from '../lib/database.js'

let handler = async (m, { args }) => {
let user = global.db.data.users[m.sender]
if (!args[0]) return m.reply('✍️ Ingresa la cantidad de *cookies 🍪* que deseas Depositar.')
if ((args[0]) < 1) return m.reply('✍️ Ingresa una cantidad válida de *cookies 🍪*.')
if (args[0] == 'all') {
let count = parseInt(user.cookies)
user.cookies -= count * 1
user.bank += count * 1
await m.reply(`Depositaste *${count} cookies 🍪* al Banco.`)
return !0
}
if (!Number(args[0])) return m.reply('🔢 La cantidad deve ser un Numero.')
let count = parseInt(args[0])
if (!user.cookies) return m.reply('No tienes *cookies 🍪* en la Cartera.')
if (user.cookies < count) return m.reply(`Solo tienes *${user.cookies} cookies 🍪* en la Cartera.`)
user.cookies -= count * 1
user.bank += count * 1
await m.reply(`Depositaste *${count} cookies 🍪* al Banco.`)}

handler.help = ['depositar']
handler.tags = ['economy']
handler.command = ['deposit', 'depositar', 'd', 'dep', 'aguardar']
handler.group = true;
handler.register = true
export default handler 
