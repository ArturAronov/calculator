import {useState, useEffect} from 'react';

export function App(){
  const [firstBuffer, setFirstBuffer]=useState([]); 
  const [secondBuffer, setSecondBuffer]=useState([]);
  const [operator, setOperator]=useState(null);
  const [clear, setClear]=useState('AC')

  let verifyFirstBuffer=firstBuffer.length<1;
  let verifySecondBuffer=secondBuffer.length<1;
  let verifyOperator=operator===null;
  
  const math={
    '+': function(x,y){return x+y},
    '-': function(x,y){return x-y},
    '*': function(x,y){return x*y},
    '/': function(x,y){return x/y},
  };

  function allocateDigits(input){
    if(verifySecondBuffer&&verifyOperator) {
      //checks if firstBuffer and placeholder are empty and operator is absent. If true the digits will get pushed ...firstBuffer array.
      setFirstBuffer([...firstBuffer, input])
    } else if(!verifyOperator) {
      //checks if firstBuffer is not empty and operator has be assigned. If true the digits will get pushed into the placeholder.
      setSecondBuffer([...secondBuffer, input])
    }
  };

  function operatorLogic(input) {
    if(input==='negPos'&&verifySecondBuffer) {
      //this condition is required to determine if number is positive or negative. If user presses '-' before entering a number, then '-' will get pushed into the the firstBuffer array
      Number(firstBuffer.join(''))>0?setFirstBuffer(['-', ...firstBuffer]):setFirstBuffer([firstBuffer.slice(1, firstBuffer.length).join('')]);
    } else if(input==='negPos'&&!verifyOperator) {
      //this condition checks if firstBuffer and operator have already been assigned and use has pressed '-' to make second digit a negative.
       Number(secondBuffer.join(''))>0?setSecondBuffer(['-', ...secondBuffer]):setSecondBuffer([secondBuffer.slice(1, secondBuffer.length).join('')]);
    } else if(operator!=='negPos') {
      //if firstBuffer is still empty and user presses operator, it will return nothing.
      setOperator(input);
    }
  };

  function result(){
    //This function calculates firstBuffer and secondBuffer by taking the operator and calling methods from the math object.
    if(operator==='+') {
      setFirstBuffer([math['+'](Number(firstBuffer.join('')), Number(secondBuffer.join('')))]);
      setSecondBuffer([]);
      setOperator(null)
    } else if(operator==='-') {
      setFirstBuffer([math['-'](Number(firstBuffer.join('')), Number(secondBuffer.join('')))]);
      setSecondBuffer([]);
      setOperator(null);
    } else if(operator==='*') {
      setFirstBuffer([math['*'](Number(firstBuffer.join('')), Number(secondBuffer.join('')))]);
      setSecondBuffer([]);
      setOperator(null);
    } else if(operator==='/') {
      setFirstBuffer([math['/'](Number(firstBuffer.join('')), Number(secondBuffer.join('')))]);
      setSecondBuffer([]);
      setOperator(null);
    };
  };

  function percentage(){
    //This function converts a number into a decimal percentage. Ie, if user presses 888 and percent button, the result becomes 8.88.
    if(verifyFirstBuffer) {
      return firstBuffer
    } else { 
      return verifySecondBuffer?setFirstBuffer([parseFloat(firstBuffer.join(''))/100]):setSecondBuffer([parseFloat(secondBuffer.join(''))/100])
    }
  };

  function reset(){
    setFirstBuffer([]);
    setSecondBuffer([]);
    setOperator(null);
  };


  function showNumber(){
    //This function decides which number is displayed in the calculator. If secondBuffer is empty, the firstBuffer is displayed. If the secondBuffer is set, then it will et displayed.
    return secondBuffer.length>0?secondBuffer:firstBuffer
  };


  useEffect(()=>{
    //Given ternary operator will decide whether there is any value stored in firstBuffer array. If it's empt...firstBuffer.length=0, therefore it's false), then the clear button displays AC, if firstBuffer array is not empty (firstBuffer.length>0, therefore it's true), then the clear button displays C.
    firstBuffer.length?setClear('C'):setClear('AC');
  }, [firstBuffer])

  return(
    <div className='calculator'>
      <div className='screen'>
        <div className='result'>
          {showNumber()}
        </div>
      </div>
      <div className='nums'>
        <button 
        className='button darkgray' 
        id='c' 
        type='button' 
        onClick={()=>reset()}>
          {clear}
        </button>

        <button 
        className='button darkgray'  
        type='button' 
        onClick={()=>operatorLogic('negPos')}>
          <div id='plusMinus'>
            <div id='plus'>
              +
            </div>
            <div id='slash'>
              /
            </div>
            <div id='minus'>
              &ndash;
            </div>
          </div>
        </button>

        <button 
        className='button darkgray'  
        type='button' 
        onClick={()=>percentage()}>
          %
        </button>

        <button 
        className='button orange'  
        type='button' 
        onClick={()=>operatorLogic('/')}>
          ÷
        </button>
      </div>
      <div className='nums'>
        <button 
        className='button lightgray'  
        type='button' 
        onClick={()=>allocateDigits('7')}>
          7
        </button>

        <button 
        className='button lightgray'  
        type='button' 
        onClick={()=>allocateDigits('8')}>
          8
        </button>

        <button
        className='button 
        lightgray'  
        type='button' 
        onClick={()=>allocateDigits('9')}>
          9
        </button>

        <button 
        className='button orange'  
        type='button' 
        onClick={()=>operatorLogic('*')}>
          &times;
        </button>
      </div>
      <div className='nums'>
        <button
        className='button lightgray'
        type='button' 
        onClick={()=>allocateDigits('4')}>
          4
        </button>
        
        <button 
        className='button lightgray'
        type='button' 
        onClick={()=>allocateDigits('5')}>
          5
        </button>

        <button 
        className='button lightgray'
        type='button' 
        onClick={()=>allocateDigits('6')}>
          6
        </button>

        <button 
        className='button orange'
        type='button' 
        onClick={()=>operatorLogic('-')}>
          &ndash;
        </button>
      </div>
      <div className='nums'>
        <button 
        className='button lightgray' 
        type='button' 
        onClick={()=>allocateDigits('1')}>
          1
        </button>

        <button 
        className='button lightgray' 
        type='button' 
        onClick={()=>allocateDigits('2')}>
          2
        </button>
        
        <button 
        className='button lightgray' 
        type='button' 
        onClick={()=>allocateDigits('3')}>
          3
        </button>

        <button 
        className='button orange' 
        type='button' 
        onClick={()=>operatorLogic('+')}>
          +
        </button>
      </div>
      <div className='nums'>
        <button 
        className='button lightgray' 
        id='zero' 
        type='button' 
        onClick={()=>allocateDigits('0')}>
          0
        </button>

        <button 
        className='button lightgray' 
        type='button' 
        onClick={()=>allocateDigits('.')}>
          .
        </button>

        <button 
        className='button orange' 
        id='equal'
        type='button' 
        onClick={()=>result()}>
          =
        </button>
        
      </div>
    </div>
  );
};
