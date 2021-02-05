import React, { useState } from "react";
import Board from "./Board";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import build_rows from "./RowFactory";

const player = {
    "black": 1,
    "white": 2
}

export default function Game() {
    const [currentPlayer, setCurrentPlayer] = useState(player.black)
    const [boardType, setBoardType] = useState(3)
    let nextPlayer;
    if (currentPlayer === player.black)
        nextPlayer = player.white
    else
        nextPlayer = player.black

    const rows = build_rows(boardType)

    return (<div>
        Hello, my darling. Have a great game. And please, have fun playing it.
        <br />It is {named(currentPlayer)}'s turn to play.
        <br />
        <Button onClick={() => setCurrentPlayer(nextPlayer)}>Click</Button>
        <br />
        <TextField onChange={(event) => boardSizeChange(event, setBoardType)}>Hello.</TextField>
        <Board rows={rows}/>
    </div>)
}

function named(currentPlayer) {
    if (currentPlayer === player.black)
        return "Black"
    return "White"
}

function boardSizeChange(event, setBoardType) {
    if (event.target.value >= 2)
        setBoardType(parseInt(event.target.value) + 1)
}