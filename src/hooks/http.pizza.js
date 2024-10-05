import { useCallback, useState } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Что-то пошло не так");
      }

      const data = await response.json();
      setLoading(true);
      setError(false);
      return data;
    } catch (error) {
      setError(true);
      throw new Error("Ошибка 500");
    }
  };

  return { request, loading, error };
};
