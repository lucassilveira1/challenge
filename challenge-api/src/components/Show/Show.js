/* eslint-disable no-unused-vars */
import "./Show.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
// hooks
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
// url
const url = "http://localhost:3000/discos";

export const Link1 = styled(Link)`
  text-decoration: none;
  margin-bottom: 20px;
  color: #000;
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0px 6px 8px rgba(25, 50, 47, 0.09),
    0px 3px 4px rgba(18, 71, 52, 0.08), 0px 1px 16px rgba(18, 71, 52, 0.03);
  font-size: 15px;

  &:hover {
    background-color: #07c2dc;
    transition: 0.3s;
  }
`;
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
    <div className="container">
      <Link1 to="/insert">Inserir</Link1>
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
