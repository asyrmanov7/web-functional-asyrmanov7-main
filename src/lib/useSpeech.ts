import {useEffect, useState} from 'react';

import {createSpeechEngine, PlayingState} from './speech';

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.

  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([0, 0]);
  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  useEffect(() => {
    for (let i = 0; i < sentences.length; i++) {
      setCurrentSentenceIdx(i)
      console.log(sentences[i])
      sentences[i].split(" ").forEach((word,index) => {
        setCurrentWordRange([0, word.length])
      })
    }

    sentences.forEach((sentence, index) => {
      setCurrentSentenceIdx(index)

    })
  },[])


  createSpeechEngine({
    onBoundary: () =>  setCurrentSentenceIdx(currentSentenceIdx + 1),
    onEnd: () => setCurrentWordRange(currentWordRange),
    onStateUpdate: () => playbackState
  })
  const play = () => {
    setPlaybackState("playing")
  };
  const pause = () => {
    setPlaybackState("paused")
  };

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };
