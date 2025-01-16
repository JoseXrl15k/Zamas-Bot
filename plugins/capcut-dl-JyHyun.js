
import fetch from 'node-fetch'

let handler = async (m, { args, conn }) => {
let loadd = [
 '《██▒▒▒▒▒▒▒▒▒▒▒》10%',
 '《████▒▒▒▒▒▒▒▒▒》30%',
 '《███████▒▒▒▒▒▒》50%',
 '《██████████▒▒▒》70%',
 '《█████████████》100%',
 '𝙻𝙾𝙰𝙳𝙸𝙽𝙶 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳...'
 ]

let { key } = await conn.sendMessage(m.chat, {text: '_Loading_'})//Pengalih isu

for (let i = 0; i < loadd.length; i++) {
await conn.sendMessage(m.chat, {text: loadd[i], edit: key })}
if (!args[0]) return m.reply("ingresa un enlace de capcut")
    
try {
let api = await fetch(`https://tools.betabotz.eu.org/tools/capcutdl?url=${args[0]}`)
let json = await api.json()
let { title, description, video_ori, cover:img, author_profile } = json.result   
let JT = `*Titulo :* ${title}
*Descripcion :* ${description}`
await conn.sendFile(m.chat , video_ori, 'HasumiBotFreeCodes.mp4', JT, m)
} catch (error) {
console.error(error)
}}

handler.command = ['capcut']

export default handler
