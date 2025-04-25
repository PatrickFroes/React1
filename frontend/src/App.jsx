import { useEffect, useState } from "react";
import "./App.css";
import DataList from "./DataList";

function App({ abrirPage }) {
  return <DataList abrirPage={abrirPage} />;
}

export default App;