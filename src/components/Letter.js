import React, { useEffect } from 'react'
import { useGlobalContext } from '../hooks/context'

const Letter = ({letterPos,attemptVal}) => {
    const {board,correctWord,currAttempt,setDisabledLetters}=useGlobalContext();
    const letter=board[attemptVal][letterPos];
    const correct= correctWord.toUpperCase()[letterPos]===letter;
    const almost= !correct && letter!=="" && correctWord.toUpperCase().includes(letter);
    const letterState=(currAttempt.attempt>attemptVal) && (correct ? 'correct' : almost ? 'almost' : 'error');

    useEffect(()=>{

            if(letter!=="" && !correct && !almost)
            setDisabledLetters((prev)=>[...prev,letter]);
            
    },[currAttempt.attempt]);
    console.log(letter);
  return (
    <div className='letter' id={letterState.toString()}>{letter}</div>
  )
}

export default Letter