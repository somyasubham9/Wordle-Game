import React from 'react'
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useGlobalContext } from '../hooks/context';
import Key from './Key';

const KeyBoard = () => {
    const {onEnter,onDelete,onSelectLetter,disabledLetters,currAttempt}=useGlobalContext();
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];
  const handleKeyBoard=useCallback((event)=>{
    if(event.key==='Enter')
        onEnter();
    else if(event.key==='Backspace')
    onDelete();
    else{
        keys1.forEach((key)=>{
            if(key.toLowerCase()===event.key.toLowerCase())
            onSelectLetter(key);
        })
        keys2.forEach((key)=>{
            if(key.toLowerCase()===event.key.toLowerCase())
            onSelectLetter(key);
        })
        keys3.forEach((key)=>{
            if(key.toLowerCase()===event.key.toLowerCase())
            onSelectLetter(key);
        })
    }
  },[currAttempt]);
  useEffect(()=>{
    document.addEventListener('keydown',handleKeyBoard);
    return () => {
        document.removeEventListener("keydown", handleKeyBoard);
      };
  },[handleKeyBoard])
  return (
    <div className='keyboard' onKeyDown={handleKeyBoard}>
        <div className="line1">
        {keys1.map((key)=>{ return <Key disabled={disabledLetters.includes(key)} keyVal={key} key={key} />})}
        </div>
        <div className="line2">
        {keys2.map((key)=>{ return <Key disabled={disabledLetters.includes(key)} keyVal={key} key={key} />})}
        </div>
        <div className="line3">
        <Key keyVal='ENTER' bigKey/>
        {keys3.map((key)=>{ return <Key disabled={disabledLetters.includes(key)} keyVal={key} key={key} />})}
        <Key keyVal='←' bigKey/>
        </div>
    </div>
  )
}

export default KeyBoard