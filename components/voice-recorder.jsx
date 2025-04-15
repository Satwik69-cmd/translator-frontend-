import {useRef,useState} from 'react';

export default function VoiceRecorder(){
    const [isRecording,setIsRecording]=useState(false);
    const [audioBase,setAudioBase]=useState(null);
    const mediaRecorderRef=useRef(null);
    const chunksRef=use
}