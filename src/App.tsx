import React from "react";
import "./index.css";
import { useState, useEffect } from "react";
import blueCandy from "./images/striped_blue_h.png";
import redCandy from "./images/red-candy.jpg";
import orangeCandy from "./images/orange-candy.png";
import yellowCandy from "./images/yellow_layer3.png";
import purpleCandy from "./images/purple_layer3.png";
import greenCandy from "./images/green.png";
import blank from "./images/blank.png";
import ScoreBoard from "./components/ScoreBoard";

const width = 8;
const candyColor = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
];

function App() {
  const [currentColorArr, setCurrentColorArr] = useState<any>([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState<any>(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState<any>(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  const checkForColumnsOfThree = () => {
    let isAColumnOfThree = false;
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArr[i];
      const isBlank = currentColorArr[i] === blank;

      if (
        columnOfThree.every(
          (square) => currentColorArr[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay(scoreDisplay + 3);
        columnOfThree.forEach((element) => {
          currentColorArr[element] = blank;
          isAColumnOfThree = true;
        });
      }
    }
    return isAColumnOfThree;
  };

  const checkForRowOfThree = () => {
    let isARowOfThree = false;
    for (let i = 0; i < 64; i++) {
      const rowsOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArr[i];
      const isBlank = currentColorArr[i] === blank;

      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowsOfThree.every(
          (square) => currentColorArr[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay(scoreDisplay + 3);
        rowsOfThree.forEach((element) => {
          currentColorArr[element] = blank;
          isARowOfThree = true;
        });
      }
    }

    return isARowOfThree;
  };

  const checkForRowOfFour = () => {
    let isARowOfFour = false;
    for (let i = 0; i < 64; i++) {
      const rowsOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArr[i];
      const isBlank = currentColorArr[i] === blank;

      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 30, 31, 37, 38, 39, 46, 47, 54, 55, 62,
        63, 64,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowsOfFour.every(
          (square) => currentColorArr[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay(scoreDisplay + 4);
        rowsOfFour.forEach((element) => {
          currentColorArr[element] = blank;
          isARowOfFour = true;
        });
      }
    }
    return isARowOfFour;
  };

  const checkForColumnsOfFour = () => {
    let isAColumnOfFour = false;

    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width * 2, i + width * 3];
      const decidedColor = currentColorArr[i];
      const isBlank = currentColorArr[i] === blank;

      if (
        columnOfFour.every(
          (square) => currentColorArr[square] === decidedColor && !isBlank
        )
      ) {
        columnOfFour.forEach((element) => {
          currentColorArr[element] = blank;
          isAColumnOfFour = true;
        });
      }
    }
    return isAColumnOfFour;
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i < 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArr[i] === blank) {
        let randomNum = Math.floor(Math.random() * candyColor.length);
        currentColorArr[i] = candyColor[randomNum];
      }

      if (currentColorArr[i + width] === blank) {
        currentColorArr[i + width] = currentColorArr[i];
        currentColorArr[i] = blank;
      }
    }
  };

  const dragStart = (e: any) => {
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e: any) => {
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = (e: any) => {
    if (squareBeingDragged === null || squareBeingReplaced == null) return;

    const squareBeingDraggedAttr = squareBeingDragged.getAttribute("data-id")
    const squareBeingReplacedAttr = squareBeingReplaced.getAttribute("data-id")

    const squareBeingDraggedId = parseInt(squareBeingDraggedAttr);
    const squareBeingReplacedId = parseInt(squareBeingReplacedAttr);

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDragged - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + 1,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isAColumnOfFour = checkForColumnsOfFour();
    const isAColumnOfThree = checkForColumnsOfThree();
    const isARowOfFour = checkForRowOfFour();
    const isARowOfThree = checkForRowOfThree();

    if (
      squareBeingReplacedId &&
      validMove &&
      (isAColumnOfFour || isAColumnOfThree || isARowOfFour || isARowOfThree)
    ) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentColorArr[squareBeingDraggedId] =
        squareBeingReplaced.getAttribute("src")
      currentColorArr[squareBeingReplacedId] =
        squareBeingDragged.getAttribute("src")
      setCurrentColorArr([...currentColorArr])
    }
  };

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColor[Math.floor(Math.random() * candyColor.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArr(randomColorArrangement);
  };
  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnsOfFour();
      checkForRowOfFour();
      checkForColumnsOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArr([...currentColorArr]);
    }, 100);

    return () => clearInterval(timer);
  }, [
    checkForColumnsOfFour,
    checkForRowOfFour,
    checkForRowOfThree,
    checkForColumnsOfThree,
    currentColorArr,
    moveIntoSquareBelow,
  ]);

  return (
    <div className="app">
      <div className="game">
        {currentColorArr.map((candyColor: string, index: number) => {
          return (
            <img
              key={index}
              src={candyColor}
              alt={candyColor}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          );
        })}
      </div>
      <ScoreBoard score={scoreDisplay} />
    </div>
  );
}

export default App;
