import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* --- ROTA EXISTENTE: Gerar imagem do céu --- */
app.get("/api/sky", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: "Latitude e longitude são obrigatórias" });
    }

    const response = await fetch(
      "https://api.astronomyapi.com/api/v2/studio/star-chart",
      {
        method: "POST",
        headers: {
          Authorization: process.env.ASTRONOMY_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          style: "default",
          observer: {
            latitude: Number(lat),
            longitude: Number(lon),
            date: new Date().toISOString().split("T")[0],
          },
          view: {
            type: "constellation",
            parameters: {
              constellation: "ori",
            },
          },
        }),
      }
    );

    const data = await response.json();

    if (!data?.data?.imageUrl) {
      return res.json({ imageUrl: null });
    }

    res.json({ imageUrl: data.data.imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar o céu" });
  }
});

/* --- RODAR BACKEND --- */
app.listen(3000, () => {
  console.log("🌌 Backend rodando em http://localhost:3000");
});
