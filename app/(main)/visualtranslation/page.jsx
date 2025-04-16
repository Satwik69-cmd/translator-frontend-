'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScanText, Copy, ImageIcon, ArrowRight, ChevronDown, FileText, GraduationCap, Languages, LanguagesIcon, MailOpen, Mic, PenBox, ScanSearchIcon, StarsIcon, Text } from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dropdown } from '@/components/dropdown';
import { Textarea } from '@/components/ui/textarea';

const ScanTranslation = () => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [outputLang, setOutputLang] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleTranslate = async () => {
    if (!file || !outputLang.trim()) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('outputLang', outputLang.trim());

    try {
      const response = await fetch('https://377e-2409-40d4-1e-e8d6-5ee-6dc0-5bff-14e8.ngrok-free.app/vision/image/translate', {
        method: 'POST',
        body: formData,
      });

      const data = await response.text();
      setTranslatedText(data);
    } catch (error) {
      console.error('Translation failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w mx-auto p-4 bg-green-50 w-full sm:w-1/2 rounded-2xl hover:shadow-[-7px_7px_0px_#50C878]">
      <h1 className="text-2xl font-bold bg-gradient-to-br from-green-600 to-green-400 bg-clip-text tracking-tighter text-transparent pb-6 flex items-center gap-4">
        <Image src="/logofinal.png" width="150" height="50" alt="verseAI" className='h-10 w-auto ml-2' />
        Photo/Document Translation
      </h1>


      <form onSubmit={(e) => e.preventDefault()}>
        {/* Image Upload Box */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-green-700 mb-2">Upload an Image</label>
          <div className="border-2 border-dashed border-green-400 rounded-xl p-6 text-center cursor-pointer hover:border-green-600 transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center gap-2">
              <ImageIcon className="w-8 h-8 text-green-500" />
              <span className="text-green-600 font-medium">Click to upload image</span>
              <span className="text-xs text-gray-500">Accepted: .jpg, .png, .jpeg</span>
            </label>
          </div>
        </div>

        {filePreview && (
          <div className="mb-4">
            <img src={filePreview} alt="Preview" className="w-full rounded shadow" />
          </div>
        )}

        {/* Language Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-green-700 mb-1">Enter Output Language</label>
          <input
            type="text"
            value={outputLang}
            onChange={(e) => setOutputLang(e.target.value)}
            placeholder="e.g., English, Hindi, French"
            className="block w-full border border-green-400 rounded px-3 py-2"
          />
        </div>

        {/* Translate Button */}
        <Button
          type="button"
          onClick={handleTranslate}
          className="bg-green-600 text-white w-full mb-4 hover:cursor-pointer"
          disabled={loading}
        >
          <ScanText className="mr-2" />
          {loading ? 'Translating...' : 'Translate'}
        </Button>

        {/* Output Box */}
        {translatedText && (
          <>
            <div className="border border-green-600 p-4 rounded mb-4 bg-white text-green-900">
              {translatedText}
            </div>
            <Button
              type="button"
              onClick={() => navigator.clipboard.writeText(translatedText)}
              className="bg-green-600 text-white w-full"
            >
              <Copy className="mr-2" /> Copy
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default ScanTranslation;