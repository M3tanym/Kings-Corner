import React from "react";

export const getTurn = (match) => {
  let p = match.profiles;
  let white = (p[0]) ? p[0].nickname : 'Unknown';
  let black = (p[1]) ? p[1].nickname : 'Unknown';
  let who = (match.whitesTurn ? white : black);
  let color = (match.whitesTurn ? 'white' : 'black');

  let text = '\'s turn';
  if (match.victor !== 'NONE') {
    who = black;
    if (match.victor === 'WHITE') {
      who = white;
    }
    text = ' won!';
  }
  return (<span>{who}{text} ({color})</span>);
};

export const gameTitle = (match) => {
  let p = match.profiles;
  let white = (p[0]) ? p[0].nickname : 'Unknown';
  let black = (p[1]) ? p[1].nickname : 'Unknown';
  let inv = (!match.accepted) ? 'Invite: ' : '';
  return inv + white + ' vs. ' + black;
};

export const playerAvatar = (match, color) => {
  let p = match.profiles;
  let white = (p[0]) ? p[0].imageURL : 'Unknown';
  let black = (p[1]) ? p[1].imageURL : 'Unknown';
  return (color === 'black') ? black :  white;
};

export const opponentAvatar = (match, playerID) => {
  let p = match.profiles;
  let url = (p[0].username === playerID) ? p[1].imageURL : p[0].imageURL;
  return url;
};