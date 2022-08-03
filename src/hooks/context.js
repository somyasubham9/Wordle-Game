import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {defaultBoard,generateWordSet} from "../Word";
const AppContext = React.createContext();


export const AppProvider = ({children}) => {

const[correctWord,setCorrectWord]=useState("");

  const [wordset,setwordset]=useState(new Set());

  useEffect(()=>{
    generateWordSet().then((words)=>{
      setwordset(words.wordSet);
      setCorrectWord(words.todaysWord);
      console.log(words.wordSet)});

  },[])

  const [board, setBoard] = useState(defaultBoard);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [disabledLetters,setDisabledLetters]=useState([]);
  const [gameOver,setGameOver]=useState({gameOver:false,guessedTheWord:false});

  const onEnter=()=>{
    if (currAttempt.letter !==5) return;

    let currWord="";
    for(let i=0;i<5;i++){
      currWord+=board[currAttempt.attempt][i].toLowerCase();
    }
    
    if(wordset.has(currWord.toLowerCase())){
    setCurrAttempt({ ...currAttempt,attempt:currAttempt.attempt+1 ,letter:0});
    }
    else{
    alert('Word Not Found!!');
    }

    if(currWord===correctWord)
    {
      setGameOver({gameOver:true,guessedTheWord:true});
      return;
    }
    if(currAttempt.attempt===5)
    {
      setGameOver({gameOver:true,guessedTheWord:false});
      return;
    }
  }
  const onSelectLetter = (keyVal) => {
    if (currAttempt.letter > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = keyVal ;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter + 1 });
  };


  const onDelete=()=>{
    if(currAttempt.letter===0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter-1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });

  }
  return (
    <AppContext.Provider value={{ board, setBoard,onDelete,onEnter,onSelectLetter,correctWord,wordset,currAttempt,setDisabledLetters,disabledLetters,gameOver,setGameOver }}>
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
