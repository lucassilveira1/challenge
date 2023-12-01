import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  // getting data from db;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);

        const json = await res.json();

        setData(json);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [url]);

  // Delete
  const deleteById = async (id) => {
    try {
      const res = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      // Updating data array if res was complete with success
      if (res.ok) {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
      }
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  };

  return { data, deleteById };
};
