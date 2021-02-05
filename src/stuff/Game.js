import React, { useState } from "react";
import Board from "./Board";
import {Button} from "@material-ui/core";

const player = {
    "black": 1,
    "white": 2
}

export default function Game() {
    const [currentPlayer, setCurrentPlayer] = useState(player.black)
    let nextPlayer;
    if (currentPlayer === player.black)
        nextPlayer = player.white
    else
        nextPlayer = player.black

    return (<div>
        Hello, my darling. Have a great game. And please, have fun playing it.
        <br />It is {named(currentPlayer)}'s turn to play.
        <Button onClick={() => setCurrentPlayer(nextPlayer)}>Click</Button>
        <Board />
    </div>)
}

function named(currentPlayer) {
    if (currentPlayer === player.black)
        return "Black"
    return "White"
}