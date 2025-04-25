import express from "express";
import cors from "cors";
import userRouter from "./Routes/users.js";
import { db } from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", userRouter);

app.get("/", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
});

app.get("/:id", (req, res) => {
  const userId = req.params.id;
  db.query("SELECT * FROM usuarios WHERE idusuarios = ?", [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({ message: "Usuário não encontrado." });
    return res.status(200).json(data[0]);
  });
});

app.post("/", (req, res) => {
  const { nome, email, telefone, conta, username } = req.body;

  if (conta.length !== 8) {
    return res.status(400).json({ message: "A conta deve ter exatamente 8 números." });
  }

  const checkQuery = "SELECT * FROM usuarios WHERE conta = ? OR username = ?";
  db.query(checkQuery, [conta, username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) {
      return res.status(400).json({ message: "Conta ou username já existe." });
    }

    const query = "INSERT INTO usuarios (nome, email, telefone, conta, username) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [nome, email, telefone, conta, username], (err) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json("Usuário cadastrado com sucesso.");
    });
  });
});

app.delete("/:id", (req, res) => {
  const userId = req.params.id;
  db.query("DELETE FROM usuarios WHERE idusuarios = ?", [userId], (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Usuário excluído com sucesso.");
  });
});

app.put("/:id", (req, res) => {
  const userId = req.params.id;
  const { nome, email, telefone, conta, username } = req.body;

  if (conta.length !== 8) {
    return res.status(400).json({ message: "A conta deve ter exatamente 8 números." });
  }

  const checkQuery = "SELECT * FROM usuarios WHERE (conta = ? OR username = ?) AND idusuarios != ?";
  db.query(checkQuery, [conta, username, userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) {
      return res.status(400).json({ message: "Conta ou username já existe." });
    }

    const query = "UPDATE usuarios SET nome = ?, email = ?, telefone = ?, conta = ?, username = ? WHERE idusuarios = ?";
    db.query(query, [nome, email, telefone, conta, username, userId], (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Usuário atualizado com sucesso.");
    });
  });
});

app.listen(8800);




