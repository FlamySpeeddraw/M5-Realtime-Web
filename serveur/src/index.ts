import express from "express";
require('dns').setServers(['8.8.4.4']);
require("dotenv").config();
var cors = require('cors');

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.listen(port, () => {
    console.log("[API] : Ouverture du serveur...");
    console.log(`[API] : Serveur démarré sur le port ${port}.`);
});

const onClose = () => {
    console.log("[API] : Fermeture du serveur...");
}

process.on('SIGINT', onClose);
process.on('SIGTERM', onClose);

module.exports = app;