import React, {useEffect, useRef, useState} from "react"

import {Box} from "@material-ui/core";

import {DndProvider, useDrop} from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useDrag } from 'react-dnd'

import { Chess } from 'chess.js';

const ChessBoard = props =>
{
  const [boardState, setBoardState] = useState(parseFenString("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"));

  return (
      <DndProvider backend={HTML5Backend}>
        <Box className="board" boxShadow={3} display={"flex"} flexWrap={"wrap"}>
          {[].concat(...boardState).map((letter, index) =>
              <BoardSquare
                  key={index}
                  row={Math.floor(index / 8)}
                  col={index % 8}
                  boardState={boardState}
                  setBoardState={setBoardState}
              >
                <Piece
                    row={Math.floor(index / 8)}
                    col={index % 8}
                    type={letterToName(letter)}
                    color={letterToColor(letter)}
                />
              </BoardSquare>
          )}
        </Box>
      </DndProvider>
  );
}

const BoardSquare = props => {
  const [{}, drop] = useDrop({
    accept: 'knight',
    drop: (item) => {
      const boardStateCopy = [...props.boardState];
      const fromItem = props.boardState[item.row][item.col];

      boardStateCopy[item.row][item.col] = props.boardState[props.row][props.col];
      boardStateCopy[props.row][props.col] = fromItem;

      props.setBoardState(boardStateCopy);
    }
  })

  return (
      <div ref={drop} className={"board-square"}>
        {props.children}
      </div>
  )
}

const Piece = props =>
{
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'knight', row: props.row, col: props.col }
  })

  return(
      <Box
          ref={drag}
          style={{cursor: 'move'}}
          className={`piece ${props.type} ${props.color}`}
      />
  )
}

const parseFenString = (fenString) =>
{
  let returnArray = [];

  const isAlpha = (ch) => /^[A-Z]$/i.test(ch);
  const isDigit = (ch) => /^[0-9]$/i.test(ch);

  let tempArray = [];

  [...fenString].forEach((letter) =>
  {
    if(isAlpha(letter)) tempArray.push(letter);
    else if (isDigit(letter))
    {
      for(let i = 0; i < parseInt(letter); i++) tempArray.push("-");
    }
    else if (letter === "/")
    {
      returnArray.push(tempArray);
      tempArray = [];
    }
  })

  returnArray.push(tempArray);
  return returnArray;
}

const letterToName = (letter) =>
{
  switch (letter.toLowerCase()) {
    case "r":
      return "rook";
    case "n":
      return "knight";
    case "b":
      return "bishop";
    case "q":
      return "queen";
    case "k":
      return "king";
    case "p":
      return "pawn";
    default:
      return "";
  }
}

const letterToColor = (letter) =>
{
  if (letter === letter.toUpperCase())
  {
    return "white";
  }

  else if (letter === letter.toLowerCase())
  {
    return "black"
  }

  else
  {
    return "";
  }
}

export default ChessBoard;