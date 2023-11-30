import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  // data rescue
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);

      const json = await res.json();

      setData(json);
    };

    fetchData();
  }, [url]);

  // Delete
  const deleteById = async (id) => {
    try {
      const res = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Se a exclusão foi bem-sucedida, atualize os dados
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
      } else {
        console.error("Erro ao deletar:", res.statusText);
      }
    } catch (error) {
      console.error("Erro na requisição de exclusão:", error);
    }
  };

  return { data, deleteById };
};
