/* eslint-disable no-unused-vars */
import "./Insert.css";
// styles
import { Link1 } from "../Show/Show";
// hooks
import { useState } from "react";

const Insert = () => {
  const [paragraph, setParagraph] = useState(false);
  const [validate, setValidate] = useState(false);

  const [artist, setArtist] = useState("");
  const [gender, setGender] = useState("");
  const [album, setAlbum] = useState("");
  const [launch, setLaunch] = useState("");

  const [disks, setDisks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Creating disk object with form data
    const disk = {
      artist,
      gender,
      album,
      launch,
    };

    // Validating form fields
    if (Object.values(disk).some((value) => value === "")) {
      setValidate(true);
      return;
    }

    // Sending request
    const res = await fetch("http://localhost:3000/discos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(disk),
    });

    // Loading data
    const addedProduct = await res.json();

    if (res.ok) {
      setDisks((prevProducts) => [...prevProducts, addedProduct]);
      setParagraph(true);
      setValidate(false);

      setTimeout(() => {
        setParagraph(false);
      }, 3000);
    } else {
      console.error("Erro ao enviar:", addedProduct);
    }

    // Cleaning form fields
    setArtist("");
    setGender("");
    setAlbum("");
    setLaunch("");
  };

  const handleReset = () => {
    setArtist("");
    setGender("");
    setAlbum("");
    setLaunch("");
  };
  return (
    <div className="container">
      <Link1 to="/">Voltar</Link1>
      <h1>Adicione um álbum ou disco!</h1>
      <div className="form">
        <form className="insert">
          <div className="input">
            <label>Artista</label>
            <input
              type="text"
              placeholder="Nome do Artista ou Banda."
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <label>Gênero</label>
            <input
              type="text"
              placeholder="Ex.: Rock || Pop || Indie."
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <label>Nome do Disco</label>
            <input
              type="text"
              placeholder="Nome do Disco ou Álbum."
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              required
            />
          </div>

          <div className="input">
            <label>Lançamento do Disco</label>
            <input
              type="date"
              placeholder="Ex.: 24/10/2000"
              value={launch}
              onChange={(e) => setLaunch(e.target.value)}
              required
            />
          </div>
          {validate && (
            <p className="validate">Os campos não podem estar vazios.</p>
          )}
          {paragraph && <p className="success">Enviado com sucesso.</p>}

          <input
            className="submit"
            type="submit"
            value="Enviar"
            onClick={handleSubmit}
          />
          <input
            className="reset"
            type="reset"
            value="Limpar"
            onClick={handleReset}
          />
        </form>
      </div>
    </div>
  );
};

export default Insert;
