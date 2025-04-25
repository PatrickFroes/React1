import { useEffect, useState } from "react";
import "./App.css";

function DataList({ abrirPage }) {
  const [data, setData] = useState([]);
  const [modalUser, setModalUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8800/")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch(() => alert("Erro ao carregar os dados."));
  }, []);

  const deletarUsuario = (id) => {
    fetch(`http://localhost:8800/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao excluir o usuário.");
        }
        return response.json();
      })
      .then(() => setData((prev) => prev.filter((user) => user.idusuarios !== id)))
      .catch((err) => alert(err.message));
  };

  const salvarEdicao = (id, updatedUser) => {
    fetch(`http://localhost:8800/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao salvar as alterações.");
        }
        return response.json();
      })
      .then(() => {
        setData((prev) =>
          prev.map((user) => (user.idusuarios === id ? { ...user, ...updatedUser } : user))
        );
        setEditUser(null);
      })
      .catch((err) => alert(err.message));
  };

  const startEdit = (user) => setEditUser(user);
  const cancelEdit = () => setEditUser(null);

  return (
    <div className="container">
      <div className="header">
        <h1>Patrick Henrique Lazarett Froes</h1>
        <button className="botao" onClick={() => abrirPage("cadastro")}>
          Cadastrar Novo Usuário
        </button>
      </div>
      <div className="list">
        <ul className="App">
          {data.map((usuario) => (
            <li key={usuario.idusuarios} className="user">
              <strong>ID:</strong> {usuario.idusuarios} <br />
              <strong>Nome:</strong> {usuario.nome} <br />
              <button className="botao" onClick={() => abrirPage("detalhes", usuario.idusuarios)}>
                Ver Detalhes
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DataList;
