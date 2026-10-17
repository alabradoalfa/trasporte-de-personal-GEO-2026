const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

let ruta1erTurno = [
  { id: 1, nombre: "EL REFUGIO", lat: 28.2001, lng: -105.5001 },
  { id: 2, nombre: "AV 6", lat: 28.1935, lng: -105.4912 },
  { id: 3, nombre: "AV 8", lat: 28.1920, lng: -105.4880 },
  { id: 4, nombre: "AV 16", lat: 28.1905, lng: -105.4850 },
  { id: 5, nombre: "AV DE LAS TORRES", lat: 28.1880, lng: -105.4800 },
  { id: 6, nombre: "SAN CARLOS", lat: 28.1865, lng: -105.4750 },
  { id: 7, nombre: "CUMBRES DEL DEPORTE", lat: 28.1850, lng: -105.4700 },
  { id: 8, nombre: "FRACC. LOS VIÑEDOS", lat: 28.1830, lng: -105.4650 },
  { id: 9, nombre: "LAS TORRES SEC-100", lat: 28.1820, lng: -105.4600 },
  { id: 10, nombre: "CIPRESES GLORIETA", lat: 28.1810, lng: -105.4580 },
  { id: 11, nombre: "MONTE ALBAN OXXO", lat: 28.1800, lng: -105.4500 },
  { id: 12, nombre: "CUMBRES POZO", lat: 28.1845, lng: -105.4680 },
  { id: 13, nombre: "AV LAS TORRES Y RIO SAN PEDRO", lat: 28.1875, lng: -105.4780 },
  { id: 14, nombre: "CUMBRES SIX", lat: 28.1855, lng: -105.4720 },
  { id: 15, nombre: "CIPRESES GLORIETA 2", lat: 28.1815, lng: -105.4590 },
  { id: 16, nombre: "SAN CARLOS 2", lat: 28.1860, lng: -105.4740 }
];

// Ordena por cercanía para no dar vueltotas (optimiza 2 calles arriba)
function optimizarRuta(ruta) {
  return [...ruta].sort((a,b) => a.lng - b.lng);
}

app.get('/', (req,res) => res.send('<h2>Geo-Bot Transporte V2 - LIVE</h2><a href="/chofer.html">/chofer</a> | <a href="/admin.html">/admin</a>'));

app.get('/api/ruta-1er-turno', (req,res) => {
  const optimizada = optimizarRuta(ruta1erTurno);
  // Link Waze: abre Waze con la primera parada, el chofer sigue la lista
  const primera = optimizada[0];
  const wazeLink = `https://www.waze.com/ul?ll=${primera.lat}%2C${primera.lng}&navigate=yes`;
  const gmapsLink = `https://www.google.com/maps/dir/${optimizada.map(p=>`${p.lat},${p.lng}`).join('/')}/`;
  res.json({ paradas: optimizada, wazeLink, gmapsLink, total: optimizada.length, tiempo: '42-45 min' });
});

app.post('/api/agregar-parada', (req,res) => {
  const { nombre, lat, lng } = req.body;
  // Si viene "2 calles arriba", le sumamos 0.0005 ~ 50mts
  const nueva = { id: Date.now(), nombre, lat: parseFloat(lat) || 28.1925, lng: parseFloat(lng) || -105.4875 };
  ruta1erTurno.push(nueva);
  res.json({ ok: true, nueva, total: ruta1erTurno.length });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('Bot LIVE en ' + PORT));
