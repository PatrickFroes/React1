import { useState } from "react";

function Cadastro({ abrirPage }) {
  const [user, setUser] = useState({ nome: "", email: "", telefone: "", conta: "", username: "" });

  const salvarCadastro = () => {
    if (user.nome && user.email && user.telefone && user.conta && user.username) {
      fetch("http://localhost:8800/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.message || "Erro ao cadastrar o usuário.");
            });
          }
          return response.json();
        })
        .then(() => {
          alert("Usuário cadastrado com sucesso!");
          abrirPage("home");
        })
        .catch((err) => alert(err.message));
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  return (
    <div className="cadastro">
      <h2>Cadastrar Novo Usuário</h2>
      <label>
        Nome:
        <input
          type="text"
          value={user.nome}
          onChange={(e) => setUser({ ...user, nome: e.target.value })}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </label>
      <label>
        Telefone:
        <input
          type="tel"
          value={user.telefone}
          onChange={(e) => setUser({ ...user, telefone: e.target.value })}
        />
      </label>
      <label>
        Conta:
        <input
          type="text"
          value={user.conta}
          onChange={(e) => setUser({ ...user, conta: e.target.value })}
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </label>
      <div className="button-container">
        <button className="botao" onClick={salvarCadastro}>Salvar</button>
        <button className="botao" onClick={() => abrirPage("home")}>Cancelar</button>
      </div>
    </div>
  );
}

export default Cadastro;
