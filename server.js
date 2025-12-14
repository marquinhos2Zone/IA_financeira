import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const pergunta = req.body.mensagem;

  const resposta = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Você é uma IA financeira que explica renda, lucro, investimentos e dá motivação."
        },
        { role: "user", content: pergunta }
      ]
    })
  });

  const data = await resposta.json();
  res.json({ resposta: data.choices[0].message.content });
});

app.listen(3000, () => {
  console.log("IA rodando na porta 3000");
});
