"use client";
import { Button } from '@/components/ui/button';
import { translate } from '@/app/actions/translate';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Dropdown } from '@/components/dropdown';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, ChevronDown, Copy, FileText, GraduationCap, Languages, LanguagesIcon, MailOpen, Mic, PenBox, ScanSearchIcon, StarsIcon, Text } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';

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





const TextTranslation = () => {
  const [languageFrom,setLanguageFrom]=useState('en');
  const [languageTo,setLanguageTo]=useState('en');
  const [inputText,setInputText]=useState("");
  const[translatedtext,settranslatedtext]=useState("");
  const handleLanguageFromChange = (value) => {
    setLanguageFrom(value);
  };
  const handleLanguageToChange=(value)=>{
    setLanguageTo(value);
  }
  const handleInputChange=(e)=>{
    const newText=e.target.value;
    setInputText(newText);
  }

  return (
    <div className='max-w mx-auto  p-4 bg-green-50 w-full sm:w-1/2  rounded-2xl transition-shadow duration-400  hover:shadow-[-7px_7px_0px_#50C878]'>
    <h1 className='text-2xl font-bold bg-gradient-to-br from-green-600 to-green-400 bg-clip-text tracking-tighter text-transparent pr-2 pb-6'>
        <div className='flex gap-5'>
          <Image src="/code1.png" width="150" height="50" alt="verseAI" className='h-10 w-auto ml-2' />
          <span className='text-4xl'>Text Translation</span>
          <div className='ml-70'>
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button size="lg"  variant="outline" className="bg-green-600 text-white rounded-lg p-5 text-center">
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block">Other</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                            <Link href={"/audiotranslation"}>
                                Audio
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={"/scantranslation"}>
                                Scan
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={"/signtranslation"}>
                                Sign
                            </Link>
                        </DropdownMenuItem>
                      
                    </DropdownMenuContent>
                    
            </DropdownMenu>
          </div>

        </div>
        

    </h1>
  

        
        <form action={async (formData)=>{
           const result = await translate(formData);
           settranslatedtext(result.translation);
        }}>
            <div className='flex gap-10 my-10 '>
                <div className='flex gap-10'>
                    <Button size="lg"  variant="outline" className="bg-green-600 text-white rounded-lg p-5 text-center">
                        <Text/>Text
                    </Button>

                </div>
                <div className='flex gap-5 '>
                  <Dropdown
                        name="languageFrom"
                        value={languageFrom}
                        options={languageOptions}
                        onChange={handleLanguageFromChange}
                        
                    />
                  <Dropdown
                        name="languageTo"
                        value={languageTo}
                        options={languageOptions}
                        onChange={handleLanguageToChange}
                    />
                </div>
            </div>


            <Textarea 
              name="text"
              value={inputText} 
              placeholder="Type here to Translate your message." 
              className="my-10 border-green-600 border-2"
              onChange={handleInputChange}/>
            <Button type="submit" size="lg"  variant="outline" className="bg-green-600 text-white rounded-lg p-5 text-center">
                <Languages /> Translate
            </Button>
            <Textarea
            className="my-10  border-green-600 border-2" 
            placeholder="Translated Text"
            value={translatedtext}
            readOnly/>
            <Button  size="lg"  variant="outline" className="bg-green-600 text-white rounded-lg p-5 text-center">
                <Copy/>Copy
            </Button>
         </form>
    </div>
  );
};

export default TextTranslation;