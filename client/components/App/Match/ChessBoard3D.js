import React, {useEffect, useState} from "react"

import {Box} from "@material-ui/core";

import {DndProvider, useDrag, useDragLayer, useDrop} from 'react-dnd'
import {getEmptyImage, HTML5Backend} from 'react-dnd-html5-backend'

import { Chess } from 'chess.js';

import BoardImage from "../../../static/images/board/wood-3d-board.png";
import BlackBishop from "../../../static/images/pieces/staunton/Black-Bishop.png";
import BlackBishopFlipped from "../../../static/images/pieces/staunton/Black-Bishop-Flipped.png";
import BlackKing from "../../../static/images/pieces/staunton/Black-King.png";
import BlackKnight from "../../../static/images/pieces/staunton/Black-Knight.png";
import BlackKnightFlipped from "../../../static/images/pieces/staunton/Black-Knight-Flipped.png";
import BlackPawn from "../../../static/images/pieces/staunton/Black-Pawn.png";
import BlackQueen from "../../../static/images/pieces/staunton/Black-Queen.png";
import BlackRook from "../../../static/images/pieces/staunton/Black-Rook.png";
import WhiteBishop from "../../../static/images/pieces/staunton/White-Bishop.png";
import WhiteBishopFlipped from "../../../static/images/pieces/staunton/White-Bishop-Flipped.png";
import WhiteKing from "../../../static/images/pieces/staunton/White-King.png";
import WhiteKnight from "../../../static/images/pieces/staunton/White-Knight.png";
import WhiteKnightFlipped from "../../../static/images/pieces/staunton/White-Knight-Flipped.png";
import WhitePawn from "../../../static/images/pieces/staunton/White-Pawn.png";
import WhiteQueen from "../../../static/images/pieces/staunton/White-Queen.png";
import WhiteRook from "../../../static/images/pieces/staunton/White-Rook.png";

const ChessBoard3D = props =>
{
  const [boardState, setBoardState] = useState(parseFenString(props.initialFen));
  const playerColor = "white";

  return (
      <DndProvider backend={HTML5Backend}>
        <Box width={"100%"} height={"100%"} boxShadow={5} style={{position: "relative"}}>
          <img style={{width: "100%", height: "100%", position: "absolute"}} src={BoardImage} />
          <Board boardState={boardState} setBoardState={setBoardState}>
            {[].concat(...boardState).map((letter, index) =>
                <Piece
                    key={index}
                    index={index}
                    row={Math.floor(index / 8)}
                    col={index % 8}
                    letter={letter}
                    playerColor={playerColor}
                />
            )}
          </Board>
          <CustomDragLayer playerColor={props.playerColor}/>
        </Box>
      </DndProvider>
  );
}

const Board = props =>
{
  const [, drop] = useDrop({
    accept: 'piece',
    drop: (item, monitor) => {

      const delta = monitor.getDifferenceFromInitialOffset();
      let newCol = Math.round(item.col + delta.x / 85);
      let newRow = Math.round(item.row + delta.y / 80);

      const boardStateCopy = [...props.boardState];
      const fromItem = props.boardState[item.row][item.col];

      boardStateCopy[item.row][item.col] = props.boardState[newRow][newCol];
      boardStateCopy[newRow][newCol] = fromItem;

      props.setBoardState(boardStateCopy);
    }
  })

  return(
      <Box width={"100%"} height={"98%"} style={{position: "absolute"}} ref={drop} display={"flex"} flexWrap={"wrap"}>
        {props.children}
      </Box>
  )
}

const Piece = props =>
{
  const [, drag, preview] = useDrag({
    item: { type: 'piece', letter: props.letter, row: props.row, col: props.col }
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  const image = fenLetterToImage(props.letter, props.playerColor);

  return (
      image ?
          <Box style={{width: "12.5%", height: "11.5%", cursor: 'move', position: "relative", overflow: "visible"}} ref={drag}>
            <img style={{width: "100%", height: "150%", position: "absolute", top: "-35%"}} src={image} />
          </Box> :
          <Box style={{width: "12.5%", height: "11.5%"}}/>
  )
}

const CustomDragLayer = (props) => {

  const getItemStyles = (initialOffset, currentOffset) => {
    if (!initialOffset || !currentOffset) return { display: 'none' };
    const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;
    return { transform, WebkitTransform: transform };
  }

  const { isDragging, item, initialOffset, currentOffset, } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging) return null;
  return (
      <Box width={"100%"} height={"100%"} style={{position: 'fixed', top: 0, left: 0, pointerEvents: 'none'}}>
        <Box style={getItemStyles(initialOffset, currentOffset)}>
          <img style={{width: 90}} src={fenLetterToImage(item.letter, props.playerColor)} />
        </Box>
      </Box>
  );
};

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

const fenLetterToImage = (letter, playerColor) =>
{
  switch(letter) {
    case "r":
      return BlackRook;
    case "n":
      return playerColor === "black" ? BlackKnight : BlackKnightFlipped;
    case "b":
      return playerColor === "black" ? BlackBishop : BlackBishopFlipped;
    case "q":
      return BlackQueen;
    case "k":
      return BlackKing;
    case "p":
      return BlackPawn;
    case "R":
      return WhiteRook;
    case "N":
      return playerColor === "white" ? WhiteKnight : WhiteKnightFlipped;
    case "B":
      return playerColor === "white" ? WhiteBishop : WhiteBishopFlipped;
    case "Q":
      return WhiteQueen;
    case "K":
      return WhiteKing;
    case "P":
      return WhitePawn;
    default:
      return null;
  }
}

export default ChessBoard3D;