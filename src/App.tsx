import React from 'react';
import './index.css';
import { useState, useEffect} from "react";

const width = 8;
const candyColor = [
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow'
]


function App() {

  const [currentColorArr, setCurrentColorArr] = useState<any>([]);

  const checkForColumnsOfThree = () => {
    for(let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColor = currentColorArr[i];

      if ( columnOfThree.every(square => currentColorArr[square] === decidedColor)){
         columnOfThree.forEach(element => {
           currentColorArr[i] = ''
         });
      }
    }
  }

 const createBoard = () => {
  const randomColorArrangement = [];
   for(let i = 0 ; i < width * width; i++){
    const randomColor = candyColor[Math.floor(Math.random() * candyColor.length)]
    randomColorArrangement.push(randomColor)
   }
   setCurrentColorArr(randomColorArrangement)
 }
 useEffect(() => {
      createBoard()
 }, [])
 
 useEffect(() => {
  const timer =  setInterval(() => {
    checkForColumnsOfThree()
    setCurrentColorArr([...currentColorArr])
  }, 100)
  return () => clearInterval(timer)

 }, [checkForColumnsOfThree, currentColorArr])
 


  return (
    <div className="app">   
      <div className="game">
         {currentColorArr.map((candyColor: string, index : number) => {
            return(
              <img 
              key={index}
              style={{backgroundColor: candyColor}}
              />
            )
         })}
        </div>     
    </div>
  );
}

export default App;
