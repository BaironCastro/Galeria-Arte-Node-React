const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const Artista = require("./models/Artista");
const Obra = require("./models/Obra");
const Exposicion = require("./models/Exposicion");
require("./models/ObraExpuesta"); // relaciones

const app = express(); // Inicializar Express
app.use(cors()); // Permite peticiones cross-origin
app.use(express.json()); // Permite parsear JSON

// Importar rutass
app.use("/artistas", require("./routes/artista"));
app.use("/obras", require("./routes/obra"));
app.use("/exposiciones", require("./routes/exposicion"));
app.use("/obras-expuestas", require("./routes/obraExpuesta"));

// Sincronizar con la base de datos
sequelize.sync({ alter: true }).then(() => {
  console.log("🟢 Base de datos sincronizada");
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API Galería de Arte funcionando");
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
