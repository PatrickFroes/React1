import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Detalhes from "./Detalhes.jsx";
import Edicao from "./edicao.jsx";
import Cadastro from "./Cadastro.jsx";

function Main() {
  const [page, setPage] = useState("home");
  const [selectedId, setSelectedId] = useState(null);

  const abrirPage = (newPage, id = null) => {
    setPage(newPage);
    setSelectedId(id);
  };

  if (page === "detalhes") {
    return <Detalhes id={selectedId} abrirPage={abrirPage} />;
  }

  if (page === "edicao") {
    return <Edicao id={selectedId} abrirPage={abrirPage} />;
  }

  if (page === "cadastro") {
    return <Cadastro abrirPage={abrirPage} />;
  }

  return <App abrirPage={abrirPage} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
