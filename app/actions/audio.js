// filepath: d:\Dev\translator-frontend--secondary\translator-frontend--secondary\app\actions\audio.js

// Audio Translation API Call
export async function translateAudio(file, outputLang, voice) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("outputLang", outputLang);
  formData.append("voice", voice);

  const response = await fetch("https://377e-2409-40d4-1e-e8d6-5ee-6dc0-5bff-14e8.ngrok-free.app/audio/translate", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Audio translation failed");
  }

  return await response.text(); 
}


export async function textToSpeech(inputText, voice) {
  const response = await fetch(`https://377e-2409-40d4-1e-e8d6-5ee-6dc0-5bff-14e8.ngrok-free.app/audio/text-speech`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputText, voice }),
  });

  if (!response.ok) {
    throw new Error("Text-to-speech conversion failed");
  }

  return await response.blob(); 
}