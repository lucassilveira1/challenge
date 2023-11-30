/* eslint-disable no-unused-vars */

import "./Show.css";
import { Link } from "react-router-dom";

// hooks
import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
// url
const url = "http://localhost:3000/discos";
const Show = () => {
  // custom hook
  const { data: discos, deleteById } = useFetch(url);

  const [paragraph, setParagraph] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteById(id);
      setParagraph(true);

      // Message timer
      setTimeout(() => {
        setParagraph(false);
      }, 3000);
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };
  return (
    <div>
      <Link to="/insert">Inserir</Link>
      <h1>CD Api</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Artista</th>
            <th>Gênero</th>
            <th>Nome do Disco</th>
            <th>Lançamento</th>
            <th>Ações</th>
          </tr>
        </thead>

        {discos &&
          discos.map((disco) => (
            <tbody key={disco.id}>
              <tr>
                <td>{disco.id}</td>
                <td>{disco.artist}</td>
                <td>{disco.gender}</td>
                <td>{disco.album}</td>
                <td>{disco.launch}</td>
                <td className="delete" onClick={() => handleDelete(disco.id)}>
                  Excluir
                </td>
              </tr>
            </tbody>
          ))}
      </table>
      {paragraph && <p className="success">Excluído com sucesso.</p>}
    </div>
  );
};

export default Show;
