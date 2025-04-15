"use server";
import Groq from "groq-sdk";


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, 
});

async function translateText(text, targetLanguage, languageFrom = "") {

  const prompt = languageFrom
    ? `Translate the following text from ${languageFrom} to ${targetLanguage}:\n\n${text}`
    : `Detect the language of the following text and translate it into ${targetLanguage}:\n\n${text}`;

  const additionalPrompt =
    "\n\nJust return the translated text only. Do not include any extra explanations.";

  try {
    const result = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", 
      messages: [
        {
          role: "system",
          content:
            "You are a professional translator. Translate accurately and return only the translated text without any extra descriptions.",
        },
        {
          role: "user",
          content: prompt + additionalPrompt,
        },
      ],
      temperature: 0.3,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const output = result.choices[0]?.message?.content || "";
    console.log(output);
    return output;
  } catch (e) {
    console.error("Translation error:", e);
    return "Couldn't load translation.";
  }
}

// have to export to form
export async function translate(formData) {
  const text = formData.get("text");
  const targetLanguage = formData.get("languageTo");
  const languageFrom = formData.get("languageFrom");

  const translation = await translateText(text, targetLanguage, languageFrom);

  return { translation };
}
