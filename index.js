const express = require('express');
const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');

const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('Geo-Bot Transporte V2 - LIVE');
});

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
  iniciarBot();
});

async function iniciarBot(){
  console.log('Iniciando bot...');
  try{
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true
    });
    console.log('Bot iniciado correctamente - Browser OK');
    const page = await browser.newPage();
    // Aquí va tu lógica de Zeek
  }catch(e){
    console.error('Error bot:', e);
  }
}
