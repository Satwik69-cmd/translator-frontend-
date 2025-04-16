"use server";

export async function translate(formData) {
  const text = formData.get("text");
  const targetLanguage = formData.get("languageTo");

  const response = await fetch("https://377e-2409-40d4-1e-e8d6-5ee-6dc0-5bff-14e8.ngrok-free.app/text/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: text,
      outputLang: targetLanguage,
    }),
  });

  if (!response.ok) {
    throw new Error("Translation failed");
  }

  const translatedText = await response.text();
  return { translation: translatedText };
}
