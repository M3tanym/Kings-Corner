import React, {useEffect, useRef, useState} from "react"

import {Box} from "@material-ui/core";

import { Chess } from 'chess.js';
import { Chessground }  from 'chessground';

const ChessBoard = props =>
{
  useEffect(() =>
  {
    const ground = Chessground(document.getElementById("board"), {});

    return ground.destroy();
  })

  return <div style={{width: 400, height: 400}}
      id = 'board'
      className = "staunton light-wood-3d chessground small" > < /div>
}

export default ChessBoard;