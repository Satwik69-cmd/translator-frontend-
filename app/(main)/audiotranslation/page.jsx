"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { translate } from "@/app/actions/translate";
import { translateAudio, textToSpeech } from "@/app/actions/audio";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dropdown } from "@/components/dropdown";
import { Textarea } from "@/components/ui/textarea";
import { Languages, ChevronDown, Copy, StarsIcon } from "lucide-react";
import Image from "next/image";
import VoiceRecorder from "@/components/voice-recorder";
import Link from "next/link";

const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "pt", label: "Portuguese" },
  { value: "ru", label: "Russian" },
  { value: "ja", label: "Japanese" },
  { value: "zh", label: "Chinese" },
  { value: "ko", label: "Korean" },
  { value: "ar", label: "Arabic" },
  { value: "hi", label: "Hindi" },
  { value: "bn", label: "Bengali" },
  { value: "pa", label: "Punjabi" },
  { value: "mr", label: "Marathi" },
  { value: "te", label: "Telugu" },
  { value: "ta", label: "Tamil" },
  { value: "ur", label: "Urdu" },
  { value: "fa", label: "Persian" },
  { value: "tr", label: "Turkish" },
  { value: "nl", label: "Dutch" },
  { value: "pl", label: "Polish" },
  { value: "vi", label: "Vietnamese" },
  { value: "th", label: "Thai" },
  { value: "id", label: "Indonesian" },
  { value: "ms", label: "Malay" },
  { value: "fil", label: "Filipino" },
  { value: "cs", label: "Czech" },
  { value: "sk", label: "Slovak" },
  { value: "hu", label: "Hungarian" },
  { value: "ro", label: "Romanian" },
  { value: "bg", label: "Bulgarian" },
  { value: "sr", label: "Serbian" },
  { value: "hr", label: "Croatian" },
  { value: "sq", label: "Albanian" },
  { value: "el", label: "Greek" },
  { value: "sv", label: "Swedish" },
  { value: "da", label: "Danish" },
  { value: "no", label: "Norwegian" },
  { value: "fi", label: "Finnish" },
  { value: "et", label: "Estonian" },
  { value: "lv", label: "Latvian" },
  { value: "lt", label: "Lithuanian" },
  { value: "ga", label: "Irish" },
  { value: "eu", label: "Basque" },
  { value: "mt", label: "Maltese" },
  { value: "is", label: "Icelandic" },
  { value: "sq", label: "Albanian" },
  { value: "sw", label: "Swahili" },
  { value: "am", label: "Amharic" },
  { value: "he", label: "Hebrew" },
  { value: "yi", label: "Yiddish" },
  { value: "bn", label: "Bengali" },
  { value: "gu", label: "Gujarati" },
  { value: "kn", label: "Kannada" },
  { value: "ml", label: "Malayalam" },
  { value: "sd", label: "Sindhi" },
  { value: "ne", label: "Nepali" },
  { value: "si", label: "Sinhala" },
  { value: "km", label: "Khmer" },
  { value: "lo", label: "Lao" },
  { value: "mn", label: "Mongolian" },
  { value: "my", label: "Burmese" },
  { value: "uz", label: "Uzbek" },
  { value: "tg", label: "Tajik" },
  { value: "ky", label: "Kyrgyz" },
  { value: "tk", label: "Turkmen" },
  { value: "ps", label: "Pashto" },
  { value: "dz", label: "Dzongkha" },
  { value: "bo", label: "Tibetan" },
  { value: "si", label: "Sinhala" },
  { value: "fy", label: "Frisian" },
  { value: "co", label: "Corsican" },
  { value: "gl", label: "Galician" },
  { value: "br", label: "Breton" },
  { value: "gd", label: "Scottish Gaelic" },
  { value: "cy", label: "Welsh" },
  { value: "ga", label: "Irish" },
  { value: "mi", label: "Maori" },
  { value: "sm", label: "Samoan" },
  { value: "to", label: "Tongan" },
  { value: "haw", label: "Hawaiian" },
  { value: "fj", label: "Fijian" },
  { value: "mg", label: "Malagasy" },
  { value: "sn", label: "Shona" },
  { value: "rw", label: "Kinyarwanda" },
  { value: "so", label: "Somali" },
  { value: "zu", label: "Zulu" },
  { value: "xh", label: "Xhosa" },
  { value: "af", label: "Afrikaans" },
  { value: "tn", label: "Tswana" },
  { value: "st", label: "Southern Sotho" },
  { value: "ss", label: "Swati" },
  { value: "nr", label: "Ndebele" },
  { value: "ny", label: "Chichewa" },
  { value: "lg", label: "Luganda" },
  { value: "ha", label: "Hausa" },
  { value: "ig", label: "Igbo" },
  { value: "yo", label: "Yoruba" },
  { value: "ee", label: "Ewe" },
  { value: "ak", label: "Akan" },
  { value: "tn", label: "Tswana" },
  { value: "zu", label: "Zulu" },
  { value: "xh", label: "Xhosa" },
];

const AudioTranslation = () => {
  const [languageFrom, setLanguageFrom] = useState("en");
  const [languageTo, setLanguageTo] = useState("en");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [file, setFile] = useState(null);

  const handleLanguageFromChange = (value) => {
    setLanguageFrom(value);
  };

  const handleLanguageToChange = (value) => {
    setLanguageTo(value);
  };

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setInputText(newText);
  };

  const handleInputSet = (text) => {
    setInputText(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const translatedText = await translateAudio(file, languageTo, "default");
      setTranslatedText(translatedText);
    } catch (error) {
      console.error("Audio translation failed:", error);
      setTranslatedText("Error: Unable to translate audio.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    alert("Copied to clipboard!");
  };

  const handleTextToSpeech = async () => {
    if (!translatedText) {
      alert("No text available for text-to-speech.");
      return;
    }

    try {
      const audioBlob = await textToSpeech(translatedText, "default"); 
      const audioUrl = URL.createObjectURL(audioBlob); 
      const audio = new Audio(audioUrl); 
      audio.play(); 
    } catch (error) {
      console.error("Text-to-speech conversion failed:", error);
      alert("Error: Unable to play audio.");
    }
  };

  return (
    <div className="max-w mx-auto p-4 bg-green-50 w-full sm:w-1/2 rounded-2xl transition-shadow duration-400 hover:shadow-[-7px_7px_0px_#50C878]">
      <h1 className="text-2xl font-bold bg-gradient-to-br from-green-600 to-green-400 bg-clip-text tracking-tighter text-transparent pr-2 pb-6">
        <div className="flex gap-5">
          <Image src="/logofinal.png" width="150" height="50" alt="verseAI" className="h-10 w-auto ml-2" />
          <span className="text-4xl">Audio Translation</span>
          <div className="ml-70">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="lg" variant="outline" className="bg-green-600 text-white rounded-lg p-5 text-center">
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block hover:cursor-pointer ">Other</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild className="hover:cursor-pointer">
                  <Link href={"/texttranslation"}>Text</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:cursor-pointer">
                  <Link href={"/visualtranslation"}>Scan</Link>
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="flex gap-10 my-10">
          <div className="flex gap-10">
            {languageFrom === "en" && <VoiceRecorder handleSetFile={(file) => setFile(file)} />}
          </div>
          <div className="flex gap-5 ">
            <Dropdown name="languageFrom"  className="hover:cursor-pointer" value={languageFrom} options={languageOptions} onChange={handleLanguageFromChange} />
            <Dropdown name="languageTo" value={languageTo} options={languageOptions} onChange={handleLanguageToChange} />
          </div>
        </div>

        <Textarea
          className="my-10 border-green-600  border-2"
          placeholder="Translated Text"
          value={translatedText}
          readOnly
        />

        
        <Button
          size="lg"
          variant="outline"
          className="bg-green-600 text-white hover:cursor-pointer rounded-lg p-5 text-center"
          onClick={handleSubmit}
        >
          Translate
        </Button>

        
        <Button
          size="lg"
          variant="outline"
          className="bg-green-600 text-white hover:cursor-pointer rounded-lg p-5 text-center mt-4"
          onClick={handleTextToSpeech}
          disabled={!translatedText} // Disable if no translated text is available
        >
          Play Audio
        </Button>
      </form>
    </div>
  );
};

export default AudioTranslation;
