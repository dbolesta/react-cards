import React from "react";

function ScoreBoard(props) {
  return (
    <div>
      {props.score.p1}|{props.score.p2}
      <br />
      <br />
    </div>
  );
}

export default ScoreBoard;
