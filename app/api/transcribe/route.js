"use server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import Groq from "groq-sdk";

// Init Groq SDK
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const audioBlob = formData.get("audio");

    if (!audioBlob) {
      return Response.json({ error: "No audio file provided." });
    }

    // Save the uploaded file temporarily
    const buffer = Buffer.from(await audioBlob.arrayBuffer());
    const tempFilePath = join("/tmp", `${randomUUID()}.wav`);
    await writeFile(tempFilePath, buffer);

    // Transcribe using Groq's Whisper model
    const transcription = await groq.audio.transcriptions.create({
      file: require("fs").createReadStream(tempFilePath),
      model: "whisper-large-v3-turbo",
      response_format: "verbose_json",
      language: "en",
      temperature: 0.0,
    });

    // Send only the text back
    return Response.json({ result: transcription.text });
  } catch (error) {
    console.error("Transcription error:", error);
    return Response.json({ error: error.message || "Unknown error" });
  }
}
