//YAHOO  -  SEARCH
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
if (!text) return m.reply(`Ingresa una petición`)

try {
let api = await fetch(`https://deliriussapi-oficial.vercel.app/search/yahoo?query=${encodeURIComponent(text)}&language=es`)
let json = await api.json()
let data = await json.data
let JT = 'yahoo  -  Search'
data.forEach((info, index) => {
JT += `\n\n`
JT += `*Nro* : ${index + 1}\n`
JT += `*Título* : ${info.title}\n`
JT += `*Link* : ${info.link}\n`
JT += `*Descripcion* : ${info.description}\n`
})

m.reply(JT)
} catch (error) {
console.error(error)
}}

handler.command = /^(xyahoo)$/i

export default handler
