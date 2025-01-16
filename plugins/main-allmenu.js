import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import { promises } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command }) => {
    try {        
        /*let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}*/
        let { exp, cookies, level, role } = global.db.data.users[m.sender]
        let { min, xp, max } = xpRange(level, global.multiplier)
        let name = await conn.getName(m.sender)
        let _uptime = process.uptime() * 1000
        let _muptime
        if (process.send) {
            process.send('uptime')
            _muptime = await new Promise(resolve => {
                process.once('message', resolve)
                setTimeout(resolve, 1000)
            }) * 1000
        }
        let user = global.db.data.users[m.sender]
        let muptime = clockString(_muptime)
        let uptime = clockString(_uptime)
        let totalreg = Object.keys(global.db.data.users).length
        let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let mentionedJid = [who]
        let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')
        let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
        const vid = ['https://qu.ax/Vmfll.mp4']

        let menu = `“ Hola *${taguser}* soy *Zamas Bot*, ${saludo} ”

*\`╭── ︿︿︿︿︿ •⭒   ⭒   ⭒   ⭒   ⭒   ⭒\`*
*\`┊ ‹‹ 𝐌𝐄𝐍𝐔 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐎\`*
*\`┊•⁀➷ °⭒⭒⭒ •⁀➷ °⭒⭒⭒\`*
*\`╰─── ︶︶︶︶ ✰⃕  ⌇ •⭒ ⭒ ⭒•   ˚̩̥̩̥•̩̩͙✩\`*
*\`│🍁⃟🌩┊ Creador:\`* *(｡ŏ_ŏ) Jᴏsᴇ XʀL*
*\`│🍁⃟🌩┊ Modo:\`* Publico
*\`│🍁⃟🌩┊ Libreria:\`* Baileys
*\`│🍁⃟🌩┊ Bot:\`* ${(conn.user.jid == global.conn.user.jid ? 'Oficial' : 'SubBot')}
*\`│🍁⃟🌩┊ Tiempo Activo:\`* ${uptime}
*\`│🍁⃟🌩┊ Usuarios:\`* ${totalreg}
*\`╰─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒\`*

 
*\`╭── ︿︿︿︿︿ •⭒   ⭒   ⭒   ⭒   ⭒   ⭒\`*
*\`┊ ‹‹ 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 - 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓\`*
*\`┊•⁀➷ °⭒⭒⭒ •⁀➷ °⭒⭒⭒\`*
*\`╰─── ︶︶︶︶ ✰⃕  ⌇ •⭒ ⭒ ⭒•   ˚̩̥̩̥•̩̩͙✩\`*
*\`│🍁⃟🌩┊ Usuario:\`* ${nombre}
*\`│🍁⃟🌩┊ Pais:\`* ${global.userNationality}
*\`│🍁⃟🌩┊ Exp:\`* ${exp}
*\`│🍁⃟🌩┊ Cookies:\`* ${cookies}
*\`│🍁⃟🌩┊ Nivel:\`* ${level}
*\`│🍁⃟🌩┊ Rango:\`* ${role}
*\`╰─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒\`*
 

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰ 𝐈𝐍𝐅𝐎 𝐁𝐎𝐓✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .formarpareja5
*\`┃│✰ ⋟\`* .estado
*\`┃│✰ ⋟\`* .host
*\`┃│✰ ⋟\`* .botreglas
*\`┃│✰ ⋟\`* .menu
*\`┃│✰ ⋟\`* .runtime
*\`┃│✰ ⋟\`* .script
*\`┃│✰ ⋟\`* .staff
*\`┃│✰ ⋟\`* .blocklist
*\`╰═══════════════════ ⪩\`*

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰ 𝐁𝐔𝐒𝐂𝐀𝐃𝐎𝐑𝐄𝐒✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .githubsearch
*\`┃│✰ ⋟\`* .google <búsqueda>
*\`┃│✰ ⋟\`* .mercadolibre <búsqueda>
*\`┃│✰ ⋟\`* .imagen <query>
*\`┃│✰ ⋟\`* .pinterest
*\`┃│✰ ⋟\`* .tiktoksearch <txt>
*\`╰═══════════════════ ⪩\`*

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰ 𝐉𝐔𝐄𝐆𝐎𝐒✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .69 @tag
*\`┃│✰ ⋟\`* .abrazar <@usuario>
*\`┃│✰ ⋟\`* .acertijo
*\`┃│✰ ⋟\`* .agarrar @tag
*\`┃│✰ ⋟\`* .anal @tag
*\`┃│✰ ⋟\`* .sonrojarse @tag
*\`┃│✰ ⋟\`* .gay <@tag> | <nombre>
*\`┃│✰ ⋟\`* .lesbiana <@tag> | <nombre>
*\`┃│✰ ⋟\`* .pajero <@tag> | <nombre>
*\`┃│✰ ⋟\`* .pajera <@tag> | <nombre>
*\`┃│✰ ⋟\`* .puto <@tag> | <nombre>
*\`┃│✰ ⋟\`* .puta <@tag> | <nombre>
*\`┃│✰ ⋟\`* .manco <@tag> | <nombre>
*\`┃│✰ ⋟\`* .manca <@tag> | <nombre>
*\`┃│✰ ⋟\`* .rata <@tag> | <nombre>
*\`┃│✰ ⋟\`* .prostituta <@tag> | <nombre>
*\`┃│✰ ⋟\`* .prostituto <@tag> | <nombre>
*\`┃│✰ ⋟\`* .apostar *<cantidad>*
*\`┃│✰ ⋟\`* .chupartetas @tag
*\`┃│✰ ⋟\`* .consejo
*\`┃│✰ ⋟\`* .cum @tag
*\`┃│✰ ⋟\`* .dance *<@user>*
*\`┃│✰ ⋟\`* .formarpareja5
*\`┃│✰ ⋟\`* .abrazar @tag
*\`┃│✰ ⋟\`* .violar @tag
*\`┃│✰ ⋟\`* .dormir @tag
*\`┃│✰ ⋟\`* .lamber @tag
*\`┃│✰ ⋟\`* .enamorada @tag
*\`┃│✰ ⋟\`* .mamada @tag
*\`┃│✰ ⋟\`* .meme
*\`┃│✰ ⋟\`* .violar @tag
*\`┃│✰ ⋟\`* .nombreninja *<texto>*
*\`┃│✰ ⋟\`* .acariciar @tag
*\`┃│✰ ⋟\`* .penetrar @user
*\`┃│✰ ⋟\`* .personalidad
*\`┃│✰ ⋟\`* .piropo
*\`┃│✰ ⋟\`* .pokedex *<pokemon>*
*\`┃│✰ ⋟\`* .pucheros @tag
*\`┃│✰ ⋟\`* .pregunta
*\`┃│✰ ⋟\`* .golpear @tag
*\`┃│✰ ⋟\`* .reto
*\`┃│✰ ⋟\`* .ruleta *<cantidad> <color>*
*\`┃│✰ ⋟\`* .rusa @tag
*\`┃│✰ ⋟\`* .triste @tag
*\`┃│✰ ⋟\`* .scared @tag
*\`┃│✰ ⋟\`* .sexo @tag
*\`┃│✰ ⋟\`* .ship
*\`┃│✰ ⋟\`* .love
*\`┃│✰ ⋟\`* .timida @tag
*\`┃│✰ ⋟\`* .simi
*\`┃│✰ ⋟\`* .bot
*\`┃│✰ ⋟\`* .dormir @tag
*\`┃│✰ ⋟\`* .dormir @tag
*\`┃│✰ ⋟\`* .top *<texto>*
*\`┃│✰ ⋟\`* .violar @tag
*\`┃│✰ ⋟\`* .tijeras @tag
*\`┃│✰ ⋟\`* .zodiac *2002 02 25*
*\`┃│✰ ⋟\`* .cancion
*\`┃│✰ ⋟\`* .math <mode>
*\`┃│✰ ⋟\`* .ppt
*\`┃│✰ ⋟\`* .slot <apuesta>
*\`╰═══════════════════ ⪩\`*

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰ 𝐑𝐎𝐋𝐋𝐀𝐑✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .character
*\`┃│✰ ⋟\`* .confirmar
*\`┃│✰ ⋟\`* .darrw @usuario <personaje>
*\`┃│✰ ⋟\`* .guardar <personaje>
*\`┃│✰ ⋟\`* .sacar <personaje>
*\`┃│✰ ⋟\`* .obtenidos
*\`┃│✰ ⋟\`* .robarpersonaje
*\`┃│✰ ⋟\`* .roll
*\`┃│✰ ⋟\`* .toprw
*\`╰═══════════════════ ⪩\`*

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰ 𝐒𝐄𝐑𝐁𝐎𝐓✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .jadibot
*\`┃│✰ ⋟\`* .serbot
*\`┃│✰ ⋟\`* .bots
*\`┃│✰ ⋟\`* .deletebot
*\`┃│✰ ⋟\`* .pausarai
*\`╰═══════════════════ ⪩\`*

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰  𝐁 𝐄 𝐌✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .bank
*\`┃│✰ ⋟\`* .cookies
*\`┃│✰ ⋟\`* .crimen
*\`┃│✰ ⋟\`* .daily
*\`┃│✰ ⋟\`* .claim
*\`┃│✰ ⋟\`* .depositar
*\`┃│✰ ⋟\`* .lb
*\`┃│✰ ⋟\`* .levelup
*\`┃│✰ ⋟\`* .minar
*\`┃│✰ ⋟\`* .retirar
*\`┃│✰ ⋟\`* .rob2
*\`┃│✰ ⋟\`* .rob
*\`┃│✰ ⋟\`* .addprem [@user] <days>
*\`┃│✰ ⋟\`* .slut
*\`┃│✰ ⋟\`* .trabajar
*\`┃│✰ ⋟\`* .transfer [tipo] [cantidad] [@tag]
*\`╰═══════════════════ ⪩\`*

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰ 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .profile
*\`┃│✰ ⋟\`* .unreg
*\`┃│✰ ⋟\`* .reg
*\`╰═══════════════════ ⪩\`*

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰  𝐄 𝐗 𝐏✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .bal
*\`┃│✰ ⋟\`* .daily
*\`┃│✰ ⋟\`* .Buy
*\`┃│✰ ⋟\`* .Buyall
*\`╰═══════════════════ ⪩\`*

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰ 𝐒𝐓𝐈𝐂𝐊𝐄𝐑𝐒✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .toimg (reply)
*\`┃│✰ ⋟\`* .qc
*\`┃│✰ ⋟\`* .stiker <img>
*\`┃│✰ ⋟\`* .sticker <url>
*\`┃│✰ ⋟\`* .wm <packname>|<author>
*\`╰═══════════════════ ⪩\`*

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰ 𝐀𝐍𝐈𝐌𝐄𝐒✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .animelink
*\`┃│✰ ⋟\`* .akira
*\`┃│✰ ⋟\`* .akiyama
*\`┃│✰ ⋟\`* .anna
*\`┃│✰ ⋟\`* .asuna
*\`┃│✰ ⋟\`* .ayuzawa
*\`┃│✰ ⋟\`* .boruto
*\`┃│✰ ⋟\`* .chiho
*\`┃│✰ ⋟\`* .chitoge
*\`┃│✰ ⋟\`* .deidara
*\`┃│✰ ⋟\`* .erza
*\`┃│✰ ⋟\`* .elaina
*\`┃│✰ ⋟\`* .eba
*\`┃│✰ ⋟\`* .emilia
*\`┃│✰ ⋟\`* .hestia
*\`┃│✰ ⋟\`* .hinata
*\`┃│✰ ⋟\`* .inori
*\`┃│✰ ⋟\`* .isuzu
*\`┃│✰ ⋟\`* .itachi
*\`┃│✰ ⋟\`* .itori
*\`┃│✰ ⋟\`* .kaga
*\`┃│✰ ⋟\`* .kagura
*\`┃│✰ ⋟\`* .kaori
*\`┃│✰ ⋟\`* .keneki
*\`┃│✰ ⋟\`* .kotori
*\`┃│✰ ⋟\`* .kurumi
*\`┃│✰ ⋟\`* .madara
*\`┃│✰ ⋟\`* .mikasa
*\`┃│✰ ⋟\`* .miku
*\`┃│✰ ⋟\`* .minato
*\`┃│✰ ⋟\`* .naruto
*\`┃│✰ ⋟\`* .nezuko
*\`┃│✰ ⋟\`* .sagiri
*\`┃│✰ ⋟\`* .sasuke
*\`┃│✰ ⋟\`* .sakura
*\`┃│✰ ⋟\`* .cosplay
*\`┃│✰ ⋟\`* .infoanime
*\`┃│✰ ⋟\`* .lolice
*\`┃│✰ ⋟\`* .waifu
*\`╰═══════════════════ ⪩\`*

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰ 𝐃𝐀𝐓𝐀𝐁𝐀𝐒𝐄✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .delvn <text>
*\`┃│✰ ⋟\`* .delmsg <text>
*\`┃│✰ ⋟\`* .delimg <text>
*\`┃│✰ ⋟\`* .delsticker <text>
*\`╰═══════════════════ ⪩\`*

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰ 𝐅𝐈𝐋𝐓𝐑𝐄𝐒✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .dsowner
*\`╰═══════════════════ ⪩\`*

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰ 𝐆𝐑𝐔𝐏𝐎𝐒✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .group abrir / cerrar
*\`┃│✰ ⋟\`* .delete
*\`┃│✰ ⋟\`* .setppgroup
*\`┃│✰ ⋟\`* .rentar2
*\`┃│✰ ⋟\`* .setwelcome
*\`┃│✰ ⋟\`* .demote
*\`┃│✰ ⋟\`* .encuesta <text|text2>
*\`┃│✰ ⋟\`* .hidetag
*\`┃│✰ ⋟\`* .infogrupo
*\`┃│✰ ⋟\`* .invite *<numero>*
*\`┃│✰ ⋟\`* .kick
*\`┃│✰ ⋟\`* .link
*\`┃│✰ ⋟\`* .promote
*\`┃│✰ ⋟\`* .rentar
*\`┃│✰ ⋟\`* .tagall *<mesaje>*
*\`┃│✰ ⋟\`* .invocar *<mesaje>*
*\`╰═══════════════════ ⪩\`*

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰ 𝐎𝐍 / 𝐎𝐅𝐅✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .enable <option>
*\`┃│✰ ⋟\`* .disable <option>
*\`╰═══════════════════ ⪩\`*

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰ 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .facebook
*\`┃│✰ ⋟\`* .fb
*\`┃│✰ ⋟\`* .play
*\`┃│✰ ⋟\`* .playvid
*\`┃│✰ ⋟\`* .gitclone *<url git>*
*\`┃│✰ ⋟\`* .instagram
*\`┃│✰ ⋟\`* .ig
*\`┃│✰ ⋟\`* .imagen <query>
*\`┃│✰ ⋟\`* .mediafire <url>
*\`┃│✰ ⋟\`* .apkmod
*\`┃│✰ ⋟\`* .ytmp3doc
*\`┃│✰ ⋟\`* .ytmp4doc
*\`┃│✰ ⋟\`* .spotify
*\`┃│✰ ⋟\`* .tiktok
*\`┃│✰ ⋟\`* .tw
*\`┃│✰ ⋟\`* .ytmp4 *<url youtube>*
*\`╰═══════════════════ ⪩\`*

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰ 𝐇𝐄𝐑𝐑𝐀𝐌𝐈𝐄𝐍𝐓𝐀𝐒✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .toanime
*\`┃│✰ ⋟\`* .tts <lang> <teks>
*\`┃│✰ ⋟\`* .imagen <query>
*\`┃│✰ ⋟\`* .remini
*\`┃│✰ ⋟\`* .hd
*\`┃│✰ ⋟\`* .enhance
*\`┃│✰ ⋟\`* .nuevafotochannel
*\`┃│✰ ⋟\`* .nosilenciarcanal
*\`┃│✰ ⋟\`* .silenciarcanal
*\`┃│✰ ⋟\`* .noseguircanal
*\`┃│✰ ⋟\`* .seguircanal
*\`┃│✰ ⋟\`* .avisoschannel
*\`┃│✰ ⋟\`* .resiviravisos
*\`┃│✰ ⋟\`* .inspect
*\`┃│✰ ⋟\`* .inspeccionar
*\`┃│✰ ⋟\`* .eliminarfotochannel
*\`┃│✰ ⋟\`* .reactioneschannel
*\`┃│✰ ⋟\`* .reaccioneschannel
*\`┃│✰ ⋟\`* .nuevonombrecanal
*\`┃│✰ ⋟\`* .nuevadescchannel
*\`┃│✰ ⋟\`* .readvo
*\`┃│✰ ⋟\`* .infobot
*\`┃│✰ ⋟\`* .speed
*\`╰═══════════════════ ⪩\`*

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰ 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈𝐎́𝐍✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .creador
*\`┃│✰ ⋟\`* .owner
*\`┃│✰ ⋟\`* .dash
*\`┃│✰ ⋟\`* .dashboard
*\`┃│✰ ⋟\`* .views
*\`┃│✰ ⋟\`* .database
*\`┃│✰ ⋟\`* .usuarios
*\`┃│✰ ⋟\`* .user
*\`┃│✰ ⋟\`* .ds
*\`┃│✰ ⋟\`* .fixmsgespera
*\`┃│✰ ⋟\`* .infobot
*\`┃│✰ ⋟\`* .speed
*\`┃│✰ ⋟\`* .ping
*\`┃│✰ ⋟\`* .sistema
*\`┃│✰ ⋟\`* .speed
*\`┃│✰ ⋟\`* .speedtest
*\`┃│✰ ⋟\`* .groups
*\`┃│✰ ⋟\`* .grouplist
*\`┃│✰ ⋟\`* .reportar
*\`╰═══════════════════ ⪩\`*

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰ 𝐍𝐒𝐅𝐖✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .nsfwloli
*\`┃│✰ ⋟\`* .nsfwfoot
*\`┃│✰ ⋟\`* .nsfwass
*\`┃│✰ ⋟\`* .nsfwbdsm
*\`┃│✰ ⋟\`* .nsfwcum
*\`┃│✰ ⋟\`* .nsfwero
*\`┃│✰ ⋟\`* .nsfwfemdom
*\`┃│✰ ⋟\`* .nsfwfoot
*\`┃│✰ ⋟\`* .nsfwglass
*\`┃│✰ ⋟\`* .nsfworgy
*\`┃│✰ ⋟\`* .yuri
*\`┃│✰ ⋟\`* .yuri2
*\`┃│✰ ⋟\`* .yaoi
*\`┃│✰ ⋟\`* .yaoi2
*\`┃│✰ ⋟\`* .panties
*\`┃│✰ ⋟\`* .tetas
*\`┃│✰ ⋟\`* .booty
*\`┃│✰ ⋟\`* .ecchi
*\`┃│✰ ⋟\`* .furro
*\`┃│✰ ⋟\`* .hentai
*\`┃│✰ ⋟\`* .trapito
*\`┃│✰ ⋟\`* .imagenlesbians
*\`┃│✰ ⋟\`* .pene
*\`┃│✰ ⋟\`* .porno
*\`┃│✰ ⋟\`* .randomxxx
*\`┃│✰ ⋟\`* .pechos
*\`╰═══════════════════ ⪩\`*

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰ 𝐂𝐑𝐄𝐀𝐃𝐎𝐑✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .enable <option>
*\`┃│✰ ⋟\`* .disable <option>
*\`┃│✰ ⋟\`* .addprem [@user] <days>
*\`┃│✰ ⋟\`* >
*\`┃│✰ ⋟\`* =>
*\`┃│✰ ⋟\`* .copia
*\`┃│✰ ⋟\`* .broadcastgroup <teks>
*\`┃│✰ ⋟\`* .bcgc <teks>
*\`┃│✰ ⋟\`* .bcgc2
*\`┃│✰ ⋟\`* .broadcast <teks>
*\`┃│✰ ⋟\`* .bc <teks>
*\`┃│✰ ⋟\`* .cheat
*\`┃│✰ ⋟\`* .cleartmp
*\`┃│✰ ⋟\`* .delprem <@user>
*\`┃│✰ ⋟\`* .dsowner
*\`┃│✰ ⋟\`* $
*\`┃│✰ ⋟\`* .fetch
*\`┃│✰ ⋟\`* .get
*\`┃│✰ ⋟\`* .getplugin *<nombre>*
*\`┃│✰ ⋟\`* .nuevabiobot <teks>
*\`┃│✰ ⋟\`* .nuevafotobot *<imagen>*
*\`┃│✰ ⋟\`* .nuevonombrebot <teks>
*\`┃│✰ ⋟\`* .prefix [prefix]
*\`┃│✰ ⋟\`* .resetprefix
*\`┃│✰ ⋟\`* .restart
*\`┃│✰ ⋟\`* .saveplugin nombre
*\`┃│✰ ⋟\`* .update
*\`┃│✰ ⋟\`* .actualizar
*\`┃│✰ ⋟\`* >
*\`┃│✰ ⋟\`* =>
*\`┃│✰ ⋟\`* .resetpersonajes
*\`╰═══════════════════ ⪩\`*

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰ 𝐒𝐓𝐀𝐅𝐅 𝐍𝐄𝐆𝐔𝐍𝐈𝐍✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .autoadmin
*\`┃│✰ ⋟\`* .banchat
*\`┃│✰ ⋟\`* .banuser <@tag> <razón>
*\`┃│✰ ⋟\`* .grupocrear <nombre>
*\`┃│✰ ⋟\`* .ip <alamat ip>
*\`┃│✰ ⋟\`* .join <link>
*\`┃│✰ ⋟\`* .unbanchat
*\`┃│✰ ⋟\`* .unbanuser <@tag>
*\`╰═══════════════════ ⪩\`*

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰ 𝐀𝐔𝐃𝐈𝐎𝐒✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .bass [vn]
*\`┃│✰ ⋟\`* .blown [vn]
*\`┃│✰ ⋟\`* .deep [vn]
*\`┃│✰ ⋟\`* .earrape [vn]
*\`┃│✰ ⋟\`* .fast [vn]
*\`┃│✰ ⋟\`* .fat [vn]
*\`┃│✰ ⋟\`* .nightcore [vn]
*\`┃│✰ ⋟\`* .reverse [vn]
*\`┃│✰ ⋟\`* .robot [vn]
*\`┃│✰ ⋟\`* .slow [vn]
*\`┃│✰ ⋟\`* .smooth [vn]
*\`┃│✰ ⋟\`* .tupai [vn]
*\`╰═══════════════════ ⪩\`*

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰  𝐀 𝐈✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .bard
*\`┃│✰ ⋟\`* .chatgpt <texto>
*\`┃│✰ ⋟\`* .ia <texto>
*\`┃│✰ ⋟\`* .dalle
*\`┃│✰ ⋟\`* .remini
*\`╰═══════════════════ ⪩\`*

*\`╭═══════════════════ ⪩\`*
*\`╰╮き⃟✰ 𝐂𝐎𝐍𝐕𝐄𝐑𝐓𝐈𝐃𝐎𝐑𝐄𝐒✰⃟⃟き\`*
*\`╭┤✰ ⋟ 𝐙𝐀𝐌𝐀𝐒 𝐁𝐎𝐓 𝐌𝐃\`*
*\`┃╰══ ⪨\`*
*\`┃│✰ ⋟\`* .togifaud
*\`┃│✰ ⋟\`* .tourl
*\`┃│✰ ⋟\`* .tovideo
*\`╰═══════════════════ ⪩\`*

> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴊᴏsᴇ xʀʟ`.trim()

await conn.sendMessage(m.chat, { video: { url: vid.getRandom() }, caption: menu, contextInfo: { mentionedJid: [m.sender], isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.name, serverMessageId: -1, }, forwardingScore: 999, externalAdReply: { title: 'ಥ‿ಥ 𝐙𝐚𝐦𝐚𝐬 𝐁𝐨𝐭 𝐌𝐃', body: dev, thumbnailUrl: perfil, sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false,
}, }, gifPlayback: true, gifAttribution: 0 }, { quoted: null })
await m.react(emojis)    

} catch (e) {
    await m.reply(`✘ Ocurrió un error al enviar el menú\n\n${e}`)
    await m.react(error)
}}

handler.help = ['allmenu']
handler.tags = ['main']
handler.command = ['allmenu', 'menucompleto', 'helpall', 'todoelmenu'] 
handler.register = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}