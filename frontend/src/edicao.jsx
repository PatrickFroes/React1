import { useEffect, useState } from "react";

function Edicao({ id, abrirPage }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8800/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar os dados do usuário.");
        }
        return response.json();
      })
      .then((data) => setUser(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const salvarUsuario = () => {
    if (!user || !user.nome || !user.email || !user.telefone || !user.conta || !user.username) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    fetch(`http://localhost:8800/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "Erro ao atualizar o usuário.");
          });
        }
        return response.json();
      })
      .then(() => {
        alert("Usuário atualizado com sucesso!");
        abrirPage("detalhes", id);
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="cadastro">
      <h2>Editar Usuário</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label>
        Nome:
        <input
          type="text"
          value={user?.nome || ""}
          onChange={(e) => setUser({ ...user, nome: e.target.value })}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={user?.email || ""}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </label>
      <label>
        Telefone:
        <input
          type="tel"
          value={user?.telefone || ""}
          onChange={(e) => setUser({ ...user, telefone: e.target.value })}
        />
      </label>
      <label>
        Conta:
        <input
          type="text"
          value={user?.conta || ""}
          onChange={(e) => setUser({ ...user, conta: e.target.value })}
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          value={user?.username || ""}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </label>
      <div className="button-container">
        <button className="botao" onClick={salvarUsuario}>Salvar</button>
        <button className="botao" onClick={() => abrirPage("detalhes", id)}>Cancelar</button>
      </div>
    </div>
  );
}

export default Edicao;
