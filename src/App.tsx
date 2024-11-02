import './App.css';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import {useEffect, useState} from "react";
import {fetchContent, parseContentIntoSentences} from "./lib/content";
import {useSpeech} from "./lib/useSpeech";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentSentenceIdx, currentWordRange, playbackState, pause, play  } = useSpeech(sentences);
  const [data,setData] = useState<string>("")

  const getData  = async () => {
        const data =   await fetchContent()
        setData(data)
    }

    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {
        const sentences  = parseContentIntoSentences(data)
        setSentences(sentences)
    }, [data]);



  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading currentSentenceIdx={currentSentenceIdx} currentWordRange={currentWordRange} sentences={sentences} />
      </div>
      <div>
        <Controls/>
      </div>
    </div>
  );
}

export default App;
