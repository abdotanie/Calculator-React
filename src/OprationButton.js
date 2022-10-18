import React from 'react'
import { ACTION } from './App'

export default function OprationButton({operation ,dispatch}) {
    return (
        <button onClick={()=> dispatch({type :ACTION.CHOOSE_OPERATION ,payload:{operation}})} >
            {operation}
            </button>
       )
  
}
