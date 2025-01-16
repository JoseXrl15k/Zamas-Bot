

import fs from "fs";

let frases = [];
let frasesEnviadas = [];
let zamasid = "120363370610108637@newsletter";
let idzamas = "120363370610108637@newsletter";

fs.readFile('./src/Frases/frases.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo JSON:', err);
    return;
  }
  const jsonData = JSON.parse(data);
  frases = jsonData.frases;
});

function enviarFrase() {
  if (frases.length === 0) {
    conn.reply(zamasid, '🍄 No hay frases disponibles, por enviar.', null, rcanal);
    conn.reply(idzamas, '🍄 No hay frases disponibles, por enviar.', null, rcanal);
    return;
  }

  if (frasesEnviadas.length === frases.length) {
    conn.reply(zamasid, '✨️ Todas las frases ya fueron eviadas, se reiniciará la raiz para que envie las antiguas frases ya enviadas.', null, rcanal);
    conn.reply(idzamas, '✨️ Todas las frases ya fueron eviadas, se reiniciará la raiz para que envie las antiguas frases ya enviadas.', null, rcanal);
      frasesEnviadas = []; 
    return;
  }

  let fraseAleatoriaIndex;
  do {
    fraseAleatoriaIndex = Math.floor(Math.random() * frases.length);
  } while (frasesEnviadas.includes(fraseAleatoriaIndex));

  frasesEnviadas.push(fraseAleatoriaIndex);

  const fraseAleatoria = frases[fraseAleatoriaIndex];
  conn.reply(zamasid, `${fraseAleatoria}`, null, rcanal);
  conn.reply(idzamas, `${fraseAleatoria}`, null, rcanal);
}

// Enviar frase cada 24 horas (86,400,000 ms)
setInterval(enviarFrase, 86400000);