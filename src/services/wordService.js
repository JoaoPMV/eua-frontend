export const API_URL = import.meta.env.VITE_API_URL;

const wordAudioRequests = new Map();

export const createWord = async (word) => {
  const response = await fetch(`${API_URL}/words`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao cadastrar a palavra.");
  }

  return data;
};

export const getPronunciation = (lessonId) => {
  if (!lessonId) {
    return Promise.reject(new Error("Capítulo não informado."));
  }

  if (!wordAudioRequests.has(lessonId)) {
    const request = fetch(
      `${API_URL}/pronunciation/${encodeURIComponent(lessonId)}`,
    )
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Erro ao buscar os dados de áudio.");
        }

        return data;
      })
      .catch((error) => {
        wordAudioRequests.delete(lessonId);
        throw error;
      });

    wordAudioRequests.set(lessonId, request);
  }

  return wordAudioRequests.get(lessonId);
};
