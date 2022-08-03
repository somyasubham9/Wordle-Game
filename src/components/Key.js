import React from 'react'
import { useGlobalContext } from '../hooks/context'

const Key = ({keyVal,bigKey,disabled}) => {
    const {onEnter,onDelete,onSelectLetter}=useGlobalContext();
    const selectLetter=()=>{
        if(keyVal==='ENTER')
        onEnter();
        else if(keyVal==='←')
        onDelete();
        else onSelectLetter(keyVal);
    }
  return (
    <div
    className="key"
    id={bigKey ? 'big' : disabled && 'disabled'}
    onClick={selectLetter}
  >
    {keyVal}
  </div>
  )
}

export default Key