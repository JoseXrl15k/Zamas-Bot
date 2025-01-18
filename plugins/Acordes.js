import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `Por favor proporciona el título de una canción o el nombre del artista para buscar sus acordes!\n\nEjemplo:\n> *${usedPrefix + command}* "Shape of You"`, m);
  }

  m.reply('Buscando acordes, espera un momento...');

  try {
    const chords = new Chords(text);
    const results = await chords.getSearch();

    if (results.length === 0) {
      return m.reply('No se encontraron acordes para la canción o artista proporcionado.');
    }

    const firstResult = results[0];
    const detail = await chords.getDetail(firstResult.link);

    if (detail) {
      let message = `
*A C O R D E S  E N C O N T R A D O !*

  *Título:* ${detail.title}
  *Artista:* ${detail.artist}
  *Fecha:* ${detail.date}
  *Perfil del artista:* [Ver perfil](https://www.gitagram.com${detail.artistProfileLink})

  *Acordes:* 
${detail.chords}
`;

      await conn.sendMessage(m.chat, { text: message, footer: 'BabyBotz' }, { quoted: m });
    } else {
      m.reply('Falló al obtener detalles de los acordes.');
    }
  } catch (error) {
    m.reply("Ocurrió un error: " + error.message);
  }
};

handler.help = ["acordes"];
handler.tags = ["music"];
handler.command = ["acordes"];

class Chords {
  constructor(music) {
    this.searchUri = `https://www.gitagram.com/index.php?cat=&s=${encodeURIComponent(music)}`;
  }

  async getSearch() {
    try {
      const { data } = await axios.get(this.searchUri);
      const $ = cheerio.load(data);

      let results = [];
      $("table.table tbody tr").each((index, element) => {
        let title = $(element).find("span.title.is-6").text().trim();
        let artist = $(element).find("span.subtitle.is-6").text().replace("› ", "").trim();
        let link = $(element).find("a").attr("href");
        let type = $(element).find("span.title.is-7").text().trim();

        results.push({ title, artist, link, type });
      });

      return results;
    } catch (error) {
      console.error("Error al solicitar los datos:", error);
      return [];
    }
  }

  async getDetail(uri) {
    try {
      const { data } = await axios.get(uri);
      const $ = cheerio.load(data);

      let title = $("h1.title.is-5").text().trim();
      let artist = $("div.subheader a span.subtitle").text().replace("›", "").trim();
      let artistProfileLink = $("div.subheader a").attr("href");
      let artistImage = $("figure.image img").attr("src");
      let date = $("span.icon-text span:contains('junio')").text().trim();

      let chords = [];
      $("div.content pre").each((index, element) => {
        chords.push($(element).text().trim());
      });

      let chordss = chords.join("\n").replace(/\\n/g, "\n");

      return {
        title,
        artist,
        artistProfileLink: `https://www.gitagram.com${artistProfileLink}`,
        artistImage,
        date,
        chords: chordss
      };
    } catch (error) {
      console.error("Error al solicitar los detalles:", error);
      return null;
    }
  }
};

export default handler;
