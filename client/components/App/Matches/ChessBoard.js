import React, {useState} from "react";
import 'react-chessground/dist/styles/chessground.css'
import Chessground from "react-chessground";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

const ChessBoard = (props) => {
  const [open, setOpen] = useState(false);
  const [toSq, setToSq] = useState('');
  const [fromSq, setFromSq] = useState('');

  if (!props.board) {
    return null;
  }

  function getPieceLetter(piece, color) {
    piece = piece.toLowerCase();
    let letter = '';
    switch (piece) {
      case 'pawn':
        letter = 'P';
        break;
      case 'bishop':
        letter = 'B';
        break;
      case 'knight':
        letter = 'N';
        break;
      case 'rook':
        letter = 'R';
        break;
      case 'queen':
        letter = 'Q';
        break;
      case 'king':
        letter = 'K';
        break;
    }
    if (color === 'BLACK') {
      letter = letter.toLowerCase();
    }
    return letter;
  }

  function generateFEN(board) {
    let f = '';
    for (let row = 7; row >= 0; row--) {
      let line = '';
      for (let col = 0; col < 8; col++) {
        let piece = board[row][col];
        if (piece) {
          let name = getPieceLetter(piece.type, piece.color);
          line += name;
        }
        else {
          line += '1';
        }
      }
      f += line + '/';
    }
    return f;
  }

  function onMove(from, to) {
    let pos = ["e1", "f1", "g1", "h1", "h2", "h3", "h4", "a5", "a6", "a7", "a8", "b8", "c8", "d8"];
    let row = from[1] - 1;
    let col = from.charCodeAt(0) - 97;
    let piece = props.board[row][col];
    if (piece) {
      piece = piece.type.toLowerCase();
    }
    console.log(piece);
    if (piece === 'pawn') {
      if (pos.includes(to)) {
        setOpen(true);
        setToSq(to);
        setFromSq(from);
        return;
      }
    }
    props.onMove({to: to, from: from});
  }

  function selectPiece(p) {
    setOpen(false);
    props.onMove({to: toSq, from: fromSq, promotion: p});
  }

  let promotionDialogue = () => {
   return (
     <Box>
       <Dialog open={open} onClose={() => setOpen(false)}
               aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
         <DialogTitle id="alert-dialog-title">Pawn Promotion</DialogTitle>
         <DialogContent>
           <DialogContentText id="alert-dialog-description">Select a piece to promote your pawn to.</DialogContentText>
         </DialogContent>
         <DialogActions>
           <Button onClick={() => selectPiece("Queen")} autoFocus>Queen</Button>
           <Button onClick={() => selectPiece("Rook")} >Rook</Button>
           <Button onClick={() => selectPiece("Bishop")} >Bishop</Button>
           <Button onClick={() => selectPiece("Knight")} >Knight</Button>
         </DialogActions>
       </Dialog>
     </Box>
    );
  };

  return (
    <Box>
      <Chessground width={500} height={500} fen={generateFEN(props.board)} onMove={onMove}/>
      {promotionDialogue()}
    </Box>
  );
};

export default ChessBoard;
