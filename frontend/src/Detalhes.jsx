import { useEffect, useState } from "react";

function Detalhes({ id, abrirPage }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8800/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch(() => alert("Erro ao carregar os detalhes do usuário."));
  }, [id]);

  const deletarUsuario = () => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      fetch(`http://localhost:8800/${id}`, { method: "DELETE" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao excluir o usuário.");
          }
          return response.json();
        })
        .then(() => {
          alert("Usuário excluído com sucesso!");
          abrirPage("home");
        })
        .catch((err) => alert(err.message));
    }
  };

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="cadastro">
      <h2>Detalhes do Usuário</h2>
      <label>
        Nome:
        <input type="text" value={user.nome} readOnly />
      </label>
      <label>
        Email:
        <input type="email" value={user.email} readOnly />
      </label>
      <label>
        Telefone:
        <input type="tel" value={user.telefone} readOnly />
      </label>
      <label>
        Conta:
        <input type="text" value={user.conta} readOnly />
      </label>
      <label>
        Username:
        <input type="text" value={user.username} readOnly />
      </label>
      <div className="button-container">
        <button className="botao" onClick={() => abrirPage("edicao", user.idusuarios)}>Editar</button>
        <button className="botao" onClick={deletarUsuario}>Excluir</button>
        <button className="botao" onClick={() => abrirPage("home")}>Voltar</button>
      </div>
    </div>
  );
}

export default Detalhes;
