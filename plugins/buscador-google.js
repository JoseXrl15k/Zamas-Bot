import {googleIt} from '@bochilteam/scraper';
import google from 'google-it';
import axios from 'axios';
let handler = async (m, { conn, command, args, usedPrefix }) => {
const fetch = (await import('node-fetch')).default;
const text = args.join` `;
if (!text) return m.reply(`*\`іᥒgrᥱsᥲ ᥱᥣ 𝗍ᥱ᥊𝗍᥆ ᥲ ᑲᥙsᥴᥲr\`*\n• Ej ${usedPrefix + command} cat`) 
m.react("🔥") 
try {
const res = await fetch(`${apis}/search/googlesearch?query=${encodeURIComponent(text)}`);
const data = await res.json();
    
if (data.status && data.data && data.data.length > 0) {
let teks = `\`🔍 𝘙𝘌𝘚𝘜𝘓𝘛𝘈𝘋𝘖𝘚 𝘋𝘌:\` ${text}\n\n`;
for (let result of data.data) {
teks += `*${result.title}*\n_${result.url}_\n_${result.description}_\n\n─────────────────\n\n`;
}
                
const ss = `https://image.thum.io/get/fullpage/https://google.com/search?q=${encodeURIComponent(text)}`;
conn.sendFile(m.chat, ss, 'result.png', teks, fkontak, false, fake);
m.react("✅")                 
handler.limit = 1;      
}} catch (error) {
try {
const url = 'https://google.com/search?q=' + encodeURIComponent(text);
google({'query': text}).then(res => {
let teks = `\`🔍 𝘙𝘌𝘚𝘜𝘓𝘛𝘈𝘋𝘖𝘚 𝘋𝘌:\` ${text}\n\n*${url}*\n\n`
for (let g of res) {
teks += `_${g.title}_\n_${g.link}_\n_${g.snippet}_\n\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n\n`
}
const ss = `https://image.thum.io/get/fullpage/${url}`
conn.sendFile(m.chat, ss, 'error.png', teks, fkontak, false, rcanal)
});
m.react("✅") 
handler.limit = 1;         
} catch (e) {
handler.limit = 0;
console.log(e);
m.react("❌")  
}}}
handler.help = ['google', 'googlef'].map(v => v + ' <pencarian>')
handler.tags = ['buscadores']
handler.command = /^googlef?$/i
handler.register = true
export default handler