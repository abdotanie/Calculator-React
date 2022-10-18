import React, { useReducer } from "react";
import DigitButton from "./DigitButton";
import OprationButton from "./OprationButton";
import "./styles.css" ;
export const ACTION={
ADD_DIGIT:'add-digit',
CHOOSE_OPERATION : 'choose-operation',
CLEAR:'clear',
DELETE_DIGIT :'delete-digit',
EVALUATE :'evaluate'
}
function App() {
  function reducer(state ,{type , payload}){
    switch(type){
      case ACTION.ADD_DIGIT:
        if(state.overwrite ){
          return {
            ...state,
            currentOperand : payload.digit,
            overwrite : false

          }
        }
        if(payload.digit==="0" && state.currentOperand==="0")
         { return state}
        if(payload.digit==="." && state.currentOperand.includes(".")) 
         {return state}
        return{
          ...state,
          currentOperand: `${state.currentOperand || "" }${payload.digit}`,
        }
      case ACTION.CLEAR:
        return {}  
      case ACTION.CHOOSE_OPERATION:
        if(state.currentOperand == null && state.previousoperand == null)  {
          return state
        }
        if(state.currentOperand==null){
          return{
            ...state,
            operation :payload.operation,
          }
        }
        if(state.previousoperand == null){
          return{
            ...state,
            operation :payload.operation,
            previousoperand :state.currentOperand,
            currentOperand: null
          }
        }
        return{
          ...state,
          previousoperand:evaluate(state),
          operation :payload.operation,
          currentOperand:null
        }
      case ACTION.EVALUATE:
        
          if(state.operation == null ||
            state.previousoperand == null||
            state.currentOperand == null){
            return state
          }
          return{
            ...state,
            overwrite :true,
            operation :null,
            previousoperand :null,
            currentOperand :evaluate(state)
          }
      case ACTION.DELETE_DIGIT:
        if(state.overwrite){
          return{
            ...state,
            overwrite :false,
            currentOperand :null
          }
        }
        if(state.currentOperand== null){
          return state
        }
        if(state.currentOperand.length === 1){
          return{
            ...state,currentOperand:null
          }
        }
        return{
          ...state,
          currentOperand :state.currentOperand.slice(0 ,-1)
        }

     }

  }
  function evaluate({currentOperand,previousoperand,operation}){
    const prev =parseFloat(previousoperand)
    const current =parseFloat(currentOperand)
    if(isNaN(prev ||isNaN(current))){
      return ""
    }
    let computation=""
    switch(operation){
      case "+":
        computation=prev +current
        break
      case "-":
        computation=prev - current
        break
      case "*":
        computation=prev *current
        break
      case "/":
        computation=prev / current
        break
    }
    return computation.toString()
  }
  function formatoperand(operand){
    if(operand== null)return
    const[integr ,dec]=operand.split('.')
    if(dec == null)return INT_FROMATTER.format(integr)
    return `${INT_FROMATTER.format(integr)}.${dec}`

  }
  const INT_FROMATTER= new Intl.NumberFormat("en-us",{maximumFractionDigit:0,})
  const [{currentOperand ,previousoperand,operation} ,dispatch]=useReducer(reducer,{})
  return(
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{formatoperand(previousoperand)}{operation}</div>
        <div className="current-operand">{formatoperand(currentOperand)}</div>
      </div>
      <button className="span-two" onClick={()=> dispatch({type :ACTION.CLEAR})}>AC</button>
      <button  onClick={()=> dispatch({type :ACTION.DELETE_DIGIT})}>DEL</button>
      <OprationButton operation="/" dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <OprationButton operation="*" dispatch={dispatch}/>
      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <OprationButton operation="+" dispatch={dispatch}/>
      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <OprationButton operation="-" dispatch={dispatch}/>
      <DigitButton digit="." dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <button className="span-two" onClick={()=> dispatch({type :ACTION.EVALUATE})}>=</button>
    </div>
  )
   
}

export default App;
