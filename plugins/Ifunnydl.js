import fetch from "node-fetch"

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return conn.reply(m.chat, `❀ ingresa el link de un video de Ifunny`, m, rcanal)

try {
let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/Ifunny-dl?text=${args[0]}`)
let { video } = await api.json()
let { quality, url:dl_url } = video
await conn.sendFile(m.chat, dl_url, 'ifunny.mp4', `✦ Calidad ⪼ *${quality}*`, m, rcanal)
} catch (error) {
console.error(error)
}}

handler.command = ['ifunnydl', 'ifunny']

export default handler